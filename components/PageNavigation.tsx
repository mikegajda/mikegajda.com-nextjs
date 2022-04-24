import Link from 'next/link';
import { MAX_WIDTH_CLASS } from './Layout';

type PageNavigationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export const PageNavigation = (props: PageNavigationProps): JSX.Element => {
  const buttonClass =
    'text-xl py-1 px-6 rounded bg-emerald-500 text-white hover:text-white hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed';

  const previousDisabled = props.currentPage === 0;

  const nextDisabled = props.currentPage === props.totalPages - 1;

  const previousPageHref =
    props.currentPage - 1 == 0 ? '/' : `/${props.basePath}/[pageNumber]`;

  const previousPageAs =
    props.currentPage - 1 == 0
      ? '/'
      : `/${props.basePath}/${props.currentPage - 1}`;
  return (
    <div
      className={`${MAX_WIDTH_CLASS} mx-auto p-2 md:px-4 my-4 flex flex-row w-full h-full justify-between`}
    >
      <Link href={previousPageHref} as={previousPageAs}>
        <button
          disabled={previousDisabled}
          className={`${buttonClass} float-left`}
        >
          ←
        </button>
      </Link>
      <div className={'my-2'}>
        <span className="text-sm text-gray-500 ">
          Page: {props.currentPage + 1}/{props.totalPages}
        </span>
      </div>
      <Link
        href={`/${props.basePath}/[pageNumber]`}
        as={`/${props.basePath}/${props.currentPage + 1}`}
      >
        <button
          disabled={nextDisabled}
          className={`${buttonClass} float-right`}
        >
          →
        </button>
      </Link>
    </div>
  );
};
