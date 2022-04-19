import Link from 'next/link';
import { MAX_WIDTH_CLASS } from './Layout';

type PageNavigationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export const PageNavigation = (props: PageNavigationProps): JSX.Element => {
  const buttonClass =
    'font-bold py-2 px-4 rounded bg-emerald-500 text-white hover:text-white hover:bg-emerald-600 no-underline';
  const previousNotAllowedClass =
    props.currentPage === 0
      ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
      : '';

  const nextNotAllowed =
    props.currentPage === props.totalPages - 1
      ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
      : '';

  const previousPageHref =
    props.currentPage - 1 == 0 ? '/' : `/${props.basePath}/[pageNumber]`;

  const previousPageAs =
    props.currentPage - 1 == 0
      ? '/'
      : `/${props.basePath}/${props.currentPage - 1}`;
  return (
    <div
      className={`clear-both ${MAX_WIDTH_CLASS} mx-auto p-2 md:px-4 my-4 h-8`}
    >
      <Link href={previousPageHref} as={previousPageAs}>
        <a className={`${buttonClass} ${previousNotAllowedClass} float-left`}>
          Previous
        </a>
      </Link>
      <Link
        href={`/${props.basePath}/[pageNumber]`}
        as={`/${props.basePath}/${props.currentPage + 1}`}
      >
        <a className={`${buttonClass}  ${nextNotAllowed} float-right`}>Next</a>
      </Link>
    </div>
  );
};
