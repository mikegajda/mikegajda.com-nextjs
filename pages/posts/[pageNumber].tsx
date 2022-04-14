import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Index, { getStaticPropsForPaginatedPage } from '..';

type PageNavigationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export const PageNavigation = (props: PageNavigationProps): JSX.Element => {
  const buttonClass =
    'font-bold py-2 px-4 rounded bg-emerald-500 text-white hover:text-white hover:bg-emerald-600';
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
    <div className={'clear-both'}>
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

export const PaginatedPosts = (props): JSX.Element => {
  return <Index {...props} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  return getStaticPropsForPaginatedPage(
    parseInt(context.params.pageNumber.toString())
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { props } = await getStaticPropsForPaginatedPage(0);
  const range = [...Array(props.countOfPages).keys()];
  // we just need to iterate over the paginated groups
  // and get their indexes, as these will be fed into
  // the paths as [pageNumber]
  const paths = range.map((post, index) => {
    return {
      params: {
        pageNumber: index.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default PaginatedPosts;
