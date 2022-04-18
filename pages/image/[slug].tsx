import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import {
  SanityImageWrapper,
  SanityImageWrapperProps,
} from '../../components/SanityImageWrapper';
import { getAllImageSlugs, getImageForSlug } from '../../lib/sanityApi';

export const SingleImage = (props: SanityImageWrapperProps): JSX.Element => {
  return (
    <Layout>
      <div className={'mx-auto p-2 py-4 md:px-4'}>
        <SanityImageWrapper value={props.value} showExifMetadata={true} />
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // comes back as an array
  const image = await getImageForSlug(context.params.slug.toString());

  return {
    props: {
      value: {
        image: image[0].image,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const imageSlugs = await getAllImageSlugs();
  // we just need to iterate over the paginated groups
  // and get their indexes, as these will be fed into
  // the paths as [pageNumber]
  const paths = imageSlugs.map((slug) => {
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

export default SingleImage;
