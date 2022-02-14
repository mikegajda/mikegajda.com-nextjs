import Image from 'next/image';

const cloudfrontRoot = 'https://d13x618ct7s3kv.cloudfront.net';

const getBlurredImageUrl = (src) => {
  const imageRequest = JSON.stringify({
    bucket: 'cdn.dynamic-images.mikegajda.com',
    key: src,
    edits: {
      resize: {
        width: 10,
        fit: 'cover',
      },
    },
  });

  const request = Buffer.from(imageRequest).toString('base64');
  const url = `${cloudfrontRoot}/${request}`;

  return url;
};

const cloudfrontDynamicLoader = ({ src, width }) => {
  const imageRequest = JSON.stringify({
    bucket: 'cdn.dynamic-images.mikegajda.com',
    key: src,
    edits: {
      resize: {
        width: width,
        fit: 'cover',
        position: 'entropy',
      },
    },
  });

  const request = Buffer.from(imageRequest).toString('base64');
  const url = `${cloudfrontRoot}/${request}`;

  return url;
};

type CloudfrontDynamicImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const CloudfrontDynamicImage = ({
  src,
  alt,
  width,
  height,
}: CloudfrontDynamicImageProps) => {
  const blurredImage = getBlurredImageUrl(src);
  return (
    <Image
      loader={cloudfrontDynamicLoader}
      src={src}
      alt={alt}
      layout={'responsive'}
      sizes="50vw"
      width={width}
      height={height}
      placeholder={`blur`}
      blurDataURL={`${blurredImage}`}
    />
  );
};
