import Image from 'next/image';
import MapChart from '../components/Map';

const sanityDynamicLoader = ({ src, width }): string => {
  const url = `${src}?w=${width}`;
  return url;
};

type SanityImage = {
  assetId: string;
  title: string;
  slug: string;
  altText: string;
  caption: string;
  url: string;
  metadata: {
    dimensions: {
      height: number;
      width: number;
      aspectRatio: number;
    };
    exif: {
      ExposureTime: number;
      FNumber: string;
      ISO: string;
      LensModel: string;
      ShutterSpeedValue: number;
      FocalLength: number;
    };
    location?: {
      lng: number;
      lat: number;
    };
    lqip;
  };
};
type SanityImageWrapperProps = {
  sanityImage: SanityImage;
  wrapperClassName?: string;
};

export const exposureTimeToReaableTime = (exposureTime: number) => {
  if (exposureTime < 1) {
    return `1/${Math.round(1 / exposureTime)}s`;
  } else {
    return '${exposureTime}s';
  }
};

export const SanityImageWrapper = ({
  sanityImage,
  wrapperClassName,
}: SanityImageWrapperProps) => {
  return (
    <div className={wrapperClassName ? wrapperClassName : ''}>
      {sanityImage.title && <h1 className="mb-2">{sanityImage.title}</h1>}
      <div className="flex flex-col md:flex-row md:flex-none space-x-4">
        <div className="grow">
          <div className={'bg-white p-4 aspect-[5/4] '}>
            <div className={`relative h-full w-full`}>
              <Image
                loader={sanityDynamicLoader}
                src={sanityImage.url}
                alt={sanityImage.title}
                layout={'fill'}
                className="rounded-md overflow-hidden"
                objectFit="contain"
                sizes="75vw"
              />
            </div>
          </div>
          <p className="mt-2">{sanityImage.caption}</p>
        </div>
        <div className="hidden md:flex flex-row md:flex-col">
          {sanityImage.metadata.exif && (
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
                {Math.round(sanityImage.metadata.exif.FocalLength * 1.5)}mm
              </p>
              <p className="text-sm mb-0">
                <span className="font-semibold">Aperture </span>
                {sanityImage.metadata.exif.FNumber}
              </p>
              <p className="text-sm mb-0">
                <span className="font-semibold">ISO </span>
                {sanityImage.metadata.exif.ISO}
              </p>
              <p className="text-sm mb-0">
                <span className="font-semibold">Shutter </span>
                {exposureTimeToReaableTime(
                  sanityImage.metadata.exif.ExposureTime
                )}
              </p>
            </div>
          )}
          {sanityImage.metadata.location && (
            <div className="w-36 ml-2 md:mt-2 md:ml-0 rounded-md overflow-hidden border-2">
              <MapChart
                coordinates={[
                  sanityImage.metadata.location.lng,
                  sanityImage.metadata.location.lat,
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
