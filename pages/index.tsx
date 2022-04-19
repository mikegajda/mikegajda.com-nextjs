import { GetStaticProps } from 'next';
import { getStaticPropsForPostsPage } from '../lib/sanityApi';

import { PostsPage, PostsPageProps } from '../components/documents/post';

const Index = (props: PostsPageProps): JSX.Element => {
  return <PostsPage {...props} />;
};

export const getStaticProps: GetStaticProps = async () => {
  return await getStaticPropsForPostsPage(0);
};

export default Index;
