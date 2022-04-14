import Image from 'next/image';
import MapChart from '../components/Map';
import { SanityImage } from '../types/post';

const sanityDynamicLoader = ({ src, width }): string => {
  const url = `${src}?w=${width}`;
  return url;
};

type SanityImageWrapperProps = {
  value: {
    image: SanityImage;
  };
};

export const exposureTimeToReaableTime = (exposureTime: number) => {
  if (exposureTime < 1) {
    return `1/${Math.round(1 / exposureTime)}s`;
  } else {
    return '${exposureTime}s';
  }
};

export const SanityImageWrapper = ({ value }: SanityImageWrapperProps) => {
  const { image } = value;
  return (
    <div className={''}>
      {image.title && <h1 className="mb-2 px-2 md:px-0">{image.title}</h1>}
      <div className="flex flex-col md:flex-row md:flex-none space-x-4">
        <div className="grow">
          <div className={'bg-white p-4 aspect-[1/1] md:aspect-[5/4]'}>
            <div className={`relative h-full w-full`}>
              <Image
                loader={sanityDynamicLoader}
                src={image.asset.url}
                alt={image.title}
                layout={'fill'}
                className=" overflow-hidden"
                objectFit="contain"
                sizes="75vw"
              />
            </div>
          </div>
          <p className="mt-2 px-2 md:px-0">{image.caption}</p>
        </div>
        <div className="hidden md:flex flex-row md:flex-col">
          {image.asset.metadata.exif && (
            <div>
              <p className="text-sm mb-0">
                <span className="font-semibold">Make </span>
                Fujifilm
              </p>
              <p className="text-sm mb-0">
                <span className="font-semibold">Model </span>
                X-S10
              </p>
              <p className="text-sm mb-0">
                <span className="font-semibold">Focal Length </span>
                {Math.round(image.asset.metadata.exif.FocalLength * 1.5)}mm
              </p>
              <p className="text-sm mb-0">
                <span className="font-semibold">Aperture </span>
                {image.asset.metadata.exif.FNumber}
              </p>
              <p className="text-sm mb-0">
                <span className="font-semibold">ISO </span>
                {image.asset.metadata.exif.ISO}
              </p>
              <p className="text-sm mb-0">
                <span className="font-semibold">Shutter </span>
                {exposureTimeToReaableTime(
                  image.asset.metadata.exif.ExposureTime
                )}
              </p>
            </div>
          )}
          {image.asset.metadata.location && (
            <div className="w-36 ml-2 md:mt-2 md:ml-0 rounded-md overflow-hidden border-2">
              <MapChart
                coordinates={[
                  image.asset.metadata.location.lng,
                  image.asset.metadata.location.lat,
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
