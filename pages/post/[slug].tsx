import { GetStaticPaths, GetStaticProps } from 'next';
import Index, { IndexProps } from '..';
import { toPlainText } from '../../components/sanityComponents';
import { getAllPostSlugs, getPostForSlug } from '../../lib/sanityApi';

export const SinglePost = (props: IndexProps): JSX.Element => {
  return <Index {...props} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  // comes back as an array
  const posts = await getPostForSlug(context.params.slug.toString());

  return {
    props: {
      pageNumber: 0,
      posts,
      countOfAllPosts: 1,
      countOfPages: 0,
      customMetadata: {
        type: 'article',
        title: posts[0].title,
        image: `${posts[0].coverImage.image.asset.url}?w=1080`,
        date: posts[0].publishedAt,
        description: toPlainText(posts[0].body).substring(0, 200),
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postSlugs = await getAllPostSlugs();
  // we just need to iterate over the paginated groups
  // and get their indexes, as these will be fed into
  // the paths as [pageNumber]
  const paths = postSlugs.map((slug) => {
    return {
      params: {
        slug: slug.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default SinglePost;
