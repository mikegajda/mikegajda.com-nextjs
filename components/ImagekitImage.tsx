import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ExifData } from '../pages/api/exif/[id]';

const imagekitBaseUrl = 'https://ik.imagekit.io/77hhna3u71rq/';

const cloudfrontDynamicLoader = ({ src, width, quality }) => {
  const url = `${imagekitBaseUrl}/tr:w-${width},q-integer:${
    quality || 75
  },pr-true/${src}`;

  return url;
};

type ImagekitImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const ImagekitImage = ({ src, alt }: ImagekitImageProps) => {
  const [data, setData] = useState<ExifData | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/exif/${src}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className={
        'bg-white p-4 aspect-[5/4] flex flex-col items-center justify-center'
      }
    >
      <div className={`relative h-full w-full`}>
        <Image
          loader={cloudfrontDynamicLoader}
          src={src}
          alt={alt}
          layout={'fill'}
          objectFit="contain"
          sizes="75vw"
        />
      </div>
      <div>{isLoading}</div>
      <div>
        <span>Make {data?.exif.image.Make}</span>
      </div>
      <div>
        <span>Model {data?.exif.image.Model}</span>
      </div>
    </div>
  );
};
