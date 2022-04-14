import { format, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { PostType } from '../types/post';
import groq from 'groq';
import sanityClient from '../lib/sanityClient';
import { PortableText } from '@portabletext/react';
import { globalComponents } from '../components/sanityComponents';
type IndexProps = {
  posts: PostType[];
  sanityImages: any[];
};

export const Post = (post: PostType): JSX.Element => {
  return (
    <article
      key={post.slug.current}
      className="mt-8 rounded-lg border-2 border-gray-300 overflow-hidden shadow-[0_.15rem_.5rem_rgba(0,0,0,0.15)]"
    >
      <div className="bg-gray-200 p-3 text-sm text-gray-500 dark:text-gray-400">
        {format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
      </div>

      <div className="p-3">
        <h1 className="mb-2 text-3xl">
          <Link as={`/${post.slug.current}`} href={`/[slug]`}>
            <a className="text-gray-900 dark:text-white dark:hover:text-emerald-400 ">
              {post.title}
            </a>
          </Link>
        </h1>
      </div>
      <div>
        {post.body && (
          <PortableText value={post.body} components={globalComponents} />
        )}
      </div>
    </article>
  );
};

export const Index = ({ posts }: IndexProps): JSX.Element => {
  return (
    <Layout>
      {posts.map((post) => (
        <Post key={post.slug.current} {...post} />
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await sanityClient.fetch(
    groq`
    *[_type == "post"]{
      ...,
      body[]{
       _type == 'reference' => @->{
        _type == 'imageWrapper' => {
        ...,
        'image': {
          ...image,
         'asset': image.asset->
         }
        },
        _type != 'imageWrapper' => @,
       },
      _type != 'reference' => @
      },
    coverImage->{
     ...,
     'image': {
      ...image,
      'asset': image.asset->
      }
     },
    author->,
    }`
  );

  return {
    props: {
      posts,
    },
  };
};

export default Index;
