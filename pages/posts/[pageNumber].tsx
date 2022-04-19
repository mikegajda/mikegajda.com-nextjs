import { GetStaticPaths, GetStaticProps } from 'next';
import { PostsPage } from '../../components/documents/post';
import { getStaticPropsForPostsPage } from '../../lib/sanityApi';

export const getStaticProps: GetStaticProps = async (context) => {
  return getStaticPropsForPostsPage(
    parseInt(context.params.pageNumber.toString())
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { props } = await getStaticPropsForPostsPage(0);
  const range = [...Array(props.pagesCount).keys()];
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

export default PostsPage;
