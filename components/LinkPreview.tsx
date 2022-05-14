import Image from 'next/image';
import { getHashOfUrl, getHostFromUrl } from '../utils/urlUtils';

type LinkPreviewProps = {
  value: {
    url: string;
    title: string;
    description: string;
  };
};

const linkPreviewLoader = ({ src }) => {
  const url = `https://s3.amazonaws.com/cdn.mikegajda.com/${getHashOfUrl(
    src
  )}.jpg`;
  return url;
};

export default function LinkPreview({ value }: LinkPreviewProps): JSX.Element {
  const { url, title, description } = value;
  return (
    <div
      className={
        'border-2 rounded-md overflow-hidden border-gray-300 max-w-lg mb-2 '
      }
    >
      <div className="relative w-full aspect-[5/3]">
        <div className="relative h-full w-full">
          <a href={url}>
            <Image
              loader={linkPreviewLoader}
              layout={'fill'}
              src={url}
              className="overflow-hidden"
              objectFit="cover"
            />
          </a>
        </div>
      </div>
      <div className="relative p-2">
        <div className="text-xs text-gray-600 dark:text-gray-200">
          {getHostFromUrl(url)}
        </div>
        <a className={'text-md sm:text-lg'} href={url}>
          {title}
        </a>
        <div className={'mt-2 text-sm'}>{description}</div>
      </div>
    </div>
  );
}
