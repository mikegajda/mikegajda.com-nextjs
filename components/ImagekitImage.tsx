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

export const exposureTimeToReaableTime = (exposureTime: number) => {
  if (exposureTime < 1) {
    return `1/${Math.round(1 / exposureTime)}s`;
  } else {
    return '${exposureTime}s';
  }
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
      {title && <h1 className="mb-2">{title}</h1>}
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
          <p className="mt-2">
            These stools were one of the biggest surprises while I was
            furnishing this apartment. They match the island almost perfectly,
            despite not being part of the same set. They serve as both a primary
            place to eat meals and as additional seating around the TV for big
            groups.
          </p>
        </div>
        <div className="flex-none sm:invisible md:visible">
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
                <span className="font-semibold">Focal Length </span>
                {Math.round(data?.exif.exif.FocalLength * 1.5)}mm
              </p>
              <p className="text-sm mb-0">
                <span className="font-semibold">Aperture </span>
                {data?.exif.exif.FNumber}
              </p>
              <p className="text-sm mb-0">
                <span className="font-semibold">ISO </span>
                {data?.exif.exif.ISO}
              </p>
              <p className="text-sm mb-0">
                <span className="font-semibold">Shutter </span>
                {exposureTimeToReaableTime(data?.exif.exif.ExposureTime)}
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
