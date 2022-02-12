import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { getSortedFilteredPaginatedPosts } from '../../lib/api';
import { PostType } from '../../types/post';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Props = {
  paginatedPosts: PostType[][];
};

type PageNavigationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export const PageNavigation = (props: PageNavigationProps): JSX.Element => {
  const buttonClass =
    'font-bold py-2 px-4 rounded bg-emerald-500 text-white hover:text-white hover:bg-emerald-600';
  const previousNotAllowedClass =
    props.currentPage === 1
      ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
      : '';

  const nextNotAllowed =
    props.currentPage === props.totalPages
      ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
      : '';
  return (
    <div className={'clear-both'}>
      <Link
        href={`/${props.basePath}/[pageNumber]`}
        as={`/${props.basePath}/${props.currentPage - 1}`}
      >
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

export const PaginatedPosts = ({ paginatedPosts }: Props): JSX.Element => {
  const router = useRouter();
  const pageNumber = parseInt(router.query.pageNumber.toString());
  const indexNumber = pageNumber - 1;
  return (
    <Layout>
      {paginatedPosts[indexNumber].map((post) => (
        <h1 key={post.slug}>{post.title}</h1>
      ))}
      <PageNavigation
        currentPage={pageNumber}
        totalPages={paginatedPosts.length}
        basePath="posts"
      />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const paginatedPosts = getSortedFilteredPaginatedPosts(
    (page) => page.type === 'post'
  );

  return {
    props: { paginatedPosts },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getSortedFilteredPaginatedPosts((page) => page.type === 'post');
  // we just need to iterate over the paginated groups
  // and get their indexes, as these will be fed into
  // the paths as [pageNumber]
  const paths = posts.map((post, index) => {
    return {
      params: {
        pageNumber: (index + 1).toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default PaginatedPosts;
