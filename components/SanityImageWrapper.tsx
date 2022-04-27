import Image from 'next/image';
import Link from 'next/link';
import MapChart from '../components/Map';
import { SanityImage } from '../types/post';

const sanityDynamicLoader = ({ src, width }): string => {
  const url = `${src}?w=${width}`;
  return url;
};

export type SanityImageWrapperProps = {
  value: {
    image: SanityImage;
  };
  showExifMetadata?: boolean;
  showWhiteFrame?: boolean;
};

export const exposureTimeToReaableTime = (exposureTime: number) => {
  if (exposureTime < 1) {
    return `1/${Math.round(1 / exposureTime)}s`;
  } else {
    return '${exposureTime}s';
  }
};

type ExifMetadataProps = {
  image: SanityImage;
};
export const ExifMetadata = ({ image }: ExifMetadataProps) => {
  return (
    <>
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
            {exposureTimeToReaableTime(image.asset.metadata.exif.ExposureTime)}
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
    </>
  );
};

export const ImageWithWhiteFrame = ({ image }) => {
  return (
    <>
      <div
        className={'bg-white dark:bg-gray-200 p-4 aspect-[1/1] md:aspect-[5/4]'}
      >
        <div className={`relative h-full w-full`}>
          <Link as={`/image/${image.slug.current}`} href={`/image/[slug]`}>
            <Image
              loader={sanityDynamicLoader}
              src={image.asset.url}
              alt={image.title}
              layout={'fill'}
              className=" overflow-hidden"
              objectFit="contain"
              sizes="75vw"
            />
          </Link>
        </div>
      </div>
      <p className="mt-2 px-2 md:px-0 italic text-center">{image.caption}</p>
    </>
  );
};

export const ImageWithoutWhiteFrame = ({ image }) => {
  return (
    <>
      <div className={`relative `}>
        <Link as={`/image/${image.slug.current}`} href={`/image/[slug]`}>
          <Image
            loader={sanityDynamicLoader}
            src={image.asset.url}
            alt={image.title}
            width={image.asset.metadata.dimensions.width}
            height={image.asset.metadata.dimensions.height}
            layout={'responsive'}
            className="overflow-hidden"
            sizes="75vw"
          />
        </Link>
      </div>
      <p className="mt-2 px-2 md:px-0 italic text-center">{image.caption}</p>
    </>
  );
};
export const SanityImageWrapper = ({
  value,
  showExifMetadata,
  showWhiteFrame,
}: SanityImageWrapperProps) => {
  const { image } = value;
  return (
    <div className={''}>
      {showExifMetadata && image.title && (
        <h2 className="mb-2 px-2 md:px-0">{image.title}</h2>
      )}
      <div className="flex flex-col md:flex-row md:flex-none space-x-4">
        <div className="grow">
          {showWhiteFrame ? (
            <ImageWithWhiteFrame image={image} />
          ) : (
            <ImageWithoutWhiteFrame image={image} />
          )}
        </div>
        {showExifMetadata && (
          <div className="hidden md:flex flex-row md:flex-col">
            <ExifMetadata image={image} />
          </div>
        )}
      </div>
    </div>
  );
};
