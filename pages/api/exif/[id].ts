export type ExifData = {
  height: number;
  width: number;
  exif: {
    image: {
      Make: string;
      Model: string;
    };
  };
};
export const getExifData = async (src: string): Promise<ExifData> => {
  const headers = new Headers();
  headers.set(
    'Authorization',
    `Basic ${process.env.IMAGEKIT_BASE64_PRIVATE_KEY}`
  );
  const response = await fetch(
    `https://api.imagekit.io/v1/metadata?url=https://ik.imagekit.io/77hhna3u71rq/${src}`,
    {
      headers,
    }
  );
  return (await response.json()) as ExifData;
};

export default async function handler(req: any, res: any) {
  const {
    query: { id },
  } = req;

  const exifData = await getExifData(id);
  res.status(200).json(exifData);
}
