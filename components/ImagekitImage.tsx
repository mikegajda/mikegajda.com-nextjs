import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ExifData } from '../pages/api/exif/[id]';
import MapChart, { exifCoordsToMapCoords } from './Map';
const imagekitBaseUrl = 'https://ik.imagekit.io/77hhna3u71rq/';

const cloudfrontDynamicLoader = ({ src, width, quality }) => {
  const url = `${imagekitBaseUrl}/tr:w-${width},q-integer:${
    quality || 75
  },pr-true/${src}`;

  return url;
};

type ImagekitImageProps = {
  src: string;
  alt?: string;
  wrapperClassName?: string;
  title?: string;
};

export const ImagekitImage = ({
  src,
  alt,
  title,
  wrapperClassName,
}: ImagekitImageProps) => {
  const [data, setData] = useState<ExifData | undefined>(undefined);

  useEffect(() => {
    fetch(`/api/exif/${src}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className={wrapperClassName ? wrapperClassName : ''}>
      {title && <h1 className="mb-1">{title}</h1>}
      <div className="flex flex-row md:flex-none space-x-4">
        <div className="grow">
          <div
            className={
              'bg-white p-4 aspect-[5/4] flex flex-col items-center justify-center  '
            }
          >
            <div className={`relative h-full w-full`}>
              <Image
                loader={cloudfrontDynamicLoader}
                src={src}
                alt={alt}
                layout={'fill'}
                className="rounded-md overflow-hidden"
                objectFit="contain"
                sizes="75vw"
              />
            </div>
          </div>
        </div>
        <div className="flex-none">
          {data && (
            <>
              <p className="text-sm mb-0">
                <span className="font-semibold">Make </span>
                {data?.exif.image.Make || 'Loading...'}
              </p>
              <p className="text-sm mb-0">
                <span className="font-semibold">Model </span>
                {data?.exif.image.Model}
              </p>
              <p className="text-sm mb-0">
                <span className="font-semibold">Apertature </span>
                {data?.exif.exif.FNumber}
              </p>
              <p className="text-sm mb-0">
                <span className="font-semibold">ISO </span>
                {data?.exif.exif.ISO}
              </p>
              <p className="text-sm mb-0">
                <span className="font-semibold">Shutter </span>
                {data?.exif.exif.ShutterSpeedValue.toFixed(2)}
              </p>
            </>
          )}
          <div className="w-36 mt-2 rounded-md overflow-hidden border-2">
            <MapChart
              coordinates={data ? exifCoordsToMapCoords(data) : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
