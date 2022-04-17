import { format, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import LinkPreview from '../components/LinkPreview';
import { PostType } from '../types/post';
import { PortableText } from '@portabletext/react';
import { globalComponents } from '../components/sanityComponents';
import {
  getCountOfAllPosts,
  getPosts,
  MAX_POSTS_PER_PAGE,
} from '../lib/sanityApi';
import { PageNavigation } from './posts/[pageNumber]';

export type IndexProps = {
  pageNumber: number;
  posts: PostType[];
  countOfAllPosts: number;
  countOfPages: number;
};

export interface PostProps {
  post: PostType;
  index: number;
}
export const Post = ({ post, index }: PostProps): JSX.Element => {
  const background = index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200';
  return (
    <article key={post.slug.current} className={` ${background}`}>
      <div className={'max-w-6xl mx-auto p-2 py-4 md:px-4'}>
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
}: IndexProps): JSX.Element => {
  return (
    <Layout>
      <div className="mx-auto p-2 py-4">
        <LinkPreview
          url={
            'https://www.axios.com/zelensky-russia-ukraine-mariupol-putin-05cc553a-c6c2-4986-868e-405a7992173a.html'
          }
          title={'Zelensky: Russia, Ukraine, Mariupol: Putin'}
          description={
            'The approvals will help provide more certainty after fears that 5G signals could reduce the accuracy of certain equipment.'
          }
        />
        <div className="flex flex-wrap">test</div>
        <LinkPreview
          url={
            'https://www.nytimes.com/2022/04/17/us/politics/trump-mar-a-lago.html'
          }
          title={'Mar-a-Lago Machine: Trump as a Modern-Day Party Boss'}
          description={
            'Hoarding cash, doling out favors and seeking to crush rivals, the former president is dominating the G.O.P., preparing for another race and helping loyalists oust officials who thwarted his attempted subversion of the 2020 election.'
          }
        />
      </div>

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
