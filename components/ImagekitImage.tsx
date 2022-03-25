import Image from 'next/image';

const imagekitBaseUrl = 'https://ik.imagekit.io/77hhna3u71rq/';

const cloudfrontDynamicLoader = ({ src, width }) => {
  const url = `${imagekitBaseUrl}/tr:w${width},pr-true/${src}`;

  return url;
};

type ImagekitImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const ImagekitImage = ({ src, alt }: ImagekitImageProps) => {
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
          sizes="50vw"
        />
      </div>
    </div>
  );
};
