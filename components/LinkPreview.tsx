import Image from 'next/image';
import { getHashOfUrl, getHostFromUrl } from '../utils/urlUtils';

type LinkPreviewProps = {
  value: {
    url: string;
    title: string;
    description: string;
  };
};

const linkPreviewSvgLoader = ({ src }) => {
  const url = `https://s3.amazonaws.com/cdn.mikegajda.com/${getHashOfUrl(
    src
  )}.svg`;
  return url;
};

export default function LinkPreview({ value }: LinkPreviewProps): JSX.Element {
  const { url, title, description } = value;
  return (
    <div
      className={
        'border-2 rounded-md overflow-hidden border-gray-200 max-w-lg '
      }
    >
      <div className="relative w-full aspect-[5/3]  ">
        <div className="relative h-full w-full">
          <Image
            loader={linkPreviewSvgLoader}
            layout={'fill'}
            src={url}
            className="overflow-hidden"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="relative p-2">
        <div className="text-xs text-gray-600">{getHostFromUrl(url)}</div>
        <a className={'text-md sm:text-lg'} href={url}>
          {title}
        </a>
        <div className={'text-sm'}>{description}</div>
      </div>
    </div>
  );
}
