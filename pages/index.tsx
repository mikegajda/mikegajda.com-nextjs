import { format, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Layout, { MAX_WIDTH_CLASS } from '../components/Layout';
import { PostType } from '../types/post';
import { PortableText } from '@portabletext/react';
import { globalComponents } from '../components/sanityComponents';
import { SanityImageWrapper } from '../components/SanityImageWrapper';
import {
  getCountOfAllPosts,
  getPosts,
  MAX_POSTS_PER_PAGE,
} from '../lib/sanityApi';
import { PageNavigation } from './posts/[pageNumber]';
import { MetaProps } from '../types/layout';

export type IndexProps = {
  pageNumber: number;
  posts: PostType[];
  countOfAllPosts: number;
  countOfPages: number;
  customMetadata?: MetaProps;
};

export interface PostProps {
  post: PostType;
  index: number;
}
export const Post = ({ post, index }: PostProps): JSX.Element => {
  const background = index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200';
  return (
    <article key={post.slug.current} className={` ${background}`}>
      <div className={`${MAX_WIDTH_CLASS} mx-auto p-2 py-4 md:px-4`}>
        <div className="text-sm mb-1 text-gray-600">
          {post.author && <span>{post.author.name} - </span>}
          {format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
        </div>

        <div className="">
          <h1 className="mb-8 text-3xl">
            <Link as={`/post/${post.slug.current}`} href={`/post/[slug]`}>
              <a className="underline-offset-8">{post.title}</a>
            </Link>
          </h1>
        </div>
        {post.coverImage && (
          <SanityImageWrapper
            value={{ image: post.coverImage.image }}
            showWhiteFrame={false}
          />
        )}
        <div>
          {post.body && (
            <PortableText value={post.body} components={globalComponents} />
          )}
        </div>
      </div>
    </article>
  );
};

export const Index = ({
  posts,
  pageNumber,
  countOfPages,
  customMetadata,
}: IndexProps): JSX.Element => {
  return (
    <Layout customMeta={customMetadata}>
      {posts.map((post, index) => (
        <Post key={post.slug.current} post={post} index={index} />
      ))}
      {countOfPages > 0 && (
        <PageNavigation
          currentPage={pageNumber}
          totalPages={countOfPages}
          basePath="posts"
        />
      )}
    </Layout>
  );
};

export const getStaticPropsForPaginatedPage = async (pageNumber: number) => {
  const posts = await getPosts(
    pageNumber * MAX_POSTS_PER_PAGE,
    pageNumber * MAX_POSTS_PER_PAGE + MAX_POSTS_PER_PAGE
  );
  const countOfAllPosts = await getCountOfAllPosts();

  const countOfPages = Math.ceil(countOfAllPosts / MAX_POSTS_PER_PAGE);
  return {
    props: {
      pageNumber,
      posts,
      countOfAllPosts,
      countOfPages,
    },
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return await getStaticPropsForPaginatedPage(0);
};

export default Index;
