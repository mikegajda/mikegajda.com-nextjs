import Image from 'next/image';
import { getHashOfUrl, getHostFromUrl } from '../utils/urlUtils';

type LinkPreviewProps = {
  url: string;
  title: string;
  description: string;
};

const linkPreviewSvgLoader = ({ src }) => {
  const url = `https://s3.amazonaws.com/cdn.mikegajda.com/${getHashOfUrl(
    src
  )}.svg`;
  return url;
};

export default function LinkPreview({
  url,
  title,
  description,
}: LinkPreviewProps): JSX.Element {
  return (
    <div className="relative w-full max-w-xl aspect-[5/4] border-2 border-gray-200 flex flex-col rounded-md overflow-hidden">
      <div className="relative h-3/5">
        <Image
          loader={linkPreviewSvgLoader}
          layout={'fill'}
          src={url}
          className="overflow-hidden"
          objectFit="cover"
        />
      </div>
      <div className=" relative p-2">
        <div className="text-sm text-gray-600">{getHostFromUrl(url)}</div>
        <a className={'text-lg'} href={url}>
          {title}
        </a>
        <div>{description}</div>
      </div>
    </div>
  );
}
