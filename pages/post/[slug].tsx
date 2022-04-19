import { GetStaticPaths, GetStaticProps } from 'next';
import { toPlainText } from '../../components/sanityComponents';
import { getAllPostSlugs, getPostForSlug } from '../../lib/sanityApi';
import { PostsPage } from '../../components/documents/post';
import { DocumentsPageStaticProps } from '../../types/props';

export const getStaticProps: GetStaticProps = async (
  context
): Promise<DocumentsPageStaticProps> => {
  // comes back as an array
  const documents = await getPostForSlug(context.params.slug.toString());

  const customMetadata: any = {
    type: 'article',
    title: documents[0].title,
    date: documents[0].publishedAt,
    description: toPlainText(documents[0].body).substring(0, 200),
  };
  if (documents[0].coverImage) {
    customMetadata.image = `${documents[0].coverImage.image.asset.url}?w=1080`;
  }
  return {
    props: {
      documents,
      documentsTotalCount: 1,
      pageNumber: 0,
      pagesCount: 0,
      customMetadata,
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

export default PostsPage;
