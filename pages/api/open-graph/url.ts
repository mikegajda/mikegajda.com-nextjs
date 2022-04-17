import { URL } from 'url';
import AWS from 'aws-sdk';
import potrace from 'potrace';
import { optimize } from 'svgo';
import stringHash from 'string-hash';
import { unfurl } from 'unfurl.js';
import { Metadata } from 'unfurl.js/dist/types';
import * as Jimp from 'jimp';

const awsKeyId = process.env.AWS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const BUCKET = 'cdn.mikegajda.com';

const s3 = new AWS.S3({
  accessKeyId: awsKeyId,
  secretAccessKey: awsSecretAccessKey,
});

async function uploadBufferToAmazon(buffer, filename) {
  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET,
    Key: filename, // File name you want to save as in S3
    Body: buffer,
    ACL: 'public-read',
  };

  return new Promise((resolve, reject) => {
    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function getFileInS3(filename): Promise<string> {
  const params = {
    Bucket: BUCKET,
    Key: filename,
  };
  return new Promise((resolve, reject) => {
    s3.getObject(params, function (err, data) {
      if (err) {
        reject(err);
      }

      resolve(data.Body.toString());
    });
  });
}

async function createSvg(buffer: Buffer, params) {
  return new Promise((resolve, reject) => {
    potrace.trace(buffer, params, function (err, svg) {
      if (err) {
        reject();
      } else {
        const result = optimize(svg, {
          multipass: true,
          floatPrecision: 0,
          plugins: [
            {
              name: 'removeViewBox',
              options: {
                removeViewBox: false,
              },
            },
            {
              name: 'addAttributesToSVGElement',
              options: {
                addAttributesToSVGElement: {
                  attributes: [
                    {
                      preserveAspectRatio: `none`,
                    },
                  ],
                },
              },
            },
          ],
        });
        resolve(result.data);
      }
    });
  });
}

export async function getOpenGraphInfo(url: string) {
  return await unfurl(url);
}

export const cleanUrl = (url: string): string => {
  const parsedUrl = new URL(url);
  const cleanUrl = `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}`;
  return cleanUrl;
};

export const readImageFromUrlToBuffer = async (
  url: string
): Promise<Buffer> => {
  const image = await Jimp.read(url);
  return image.getBufferAsync('image/jpeg');
};

export const getImageUrlFromOpenGraph = (og: Metadata): string => {
  if (og.open_graph && og.open_graph.images) {
    return og.open_graph.images[0].url;
  } else {
    throw new Error('No image found');
  }
};

export const getFreshOpenGraphInfo = async (url: string) => {
  const openGraphInfo = await getOpenGraphInfo(url);
  try {
    const imageUrl = getImageUrlFromOpenGraph(openGraphInfo);
    const imageBuffer = await readImageFromUrlToBuffer(imageUrl);
    const svgBuffer = await createSvg(imageBuffer, {
      background: '#33d399',
      color: 'white',
      turdSize: 200,
      optTolerance: 0.4,
      threshold: 120,
      turnPolicy: potrace.Potrace.TURNPOLICY_MAJORITY,
    });
    const awsResponse = await uploadBufferToAmazon(
      imageBuffer,
      `${stringHash(url)}.jpg`
    );

    const awsResponse2 = await uploadBufferToAmazon(
      svgBuffer,
      `${stringHash(url)}.svg`
    );

    // eslint-disable-next-line
    console.log('awsResponse', awsResponse);
    // eslint-disable-next-line
    console.log('awsResponse2', awsResponse2);
  } catch {
    // do nothing
  }
  return openGraphInfo;
};

export const processUrl = async (url: string, breakCache = true) => {
  url = cleanUrl(url);
  const urlHash = stringHash(url);

  if (breakCache) {
    return await getFreshOpenGraphInfo(url);
  } else {
    try {
      return JSON.parse(await getFileInS3(`${urlHash}.json`));
    } catch (e) {
      return await getFreshOpenGraphInfo(url);
    }
  }
};

export default async function handler(req: any, res: any) {
  const {
    query: { url },
  } = req;

  const result = await processUrl(url);

  res.status(200).json(result);
}
