import { format, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import Layout from '../components/Layout';
import { getAllPosts } from '../lib/api';
import { PostType } from '../types/post';
import groq from 'groq';
import sanityClient from '../lib/sanityClient';
import { SanityImageWrapper } from '../components/SanityImageWrapper';
type IndexProps = {
  posts: PostType[];
  sanityImages: any[];
};

export const Index = ({ posts, sanityImages }: IndexProps): JSX.Element => {
  return (
    <Layout>
      {/* <ImagekitImage
        src={'DSCF2004_9Dl0giw35.jpeg'}
        width={1280}
        height={844}
        alt={'Fox Theatre'}
      />

      <ImagekitImage
        wrapperClassName="my-4"
        src={'DSCF2004_9Dl0giw35.jpeg'}
        title={'Fox Theatre'}
      />

      <ImagekitImage
        wrapperClassName="my-2"
        src={'DSCF2693_C5oeBk_LE.jpeg'}
        width={4160}
        height={6240}
        alt={'Fox Theatre'}
      /> */}

      {sanityImages.map((image) => (
        <SanityImageWrapper key={image.url} sanityImage={image} />
      ))}
      {posts.map((post) => (
        <article
          key={post.slug}
          className="mt-8 rounded-lg border-2 border-gray-300 overflow-hidden shadow-[0_.15rem_.5rem_rgba(0,0,0,0.15)]"
        >
          <div className="bg-gray-200 p-3 text-sm text-gray-500 dark:text-gray-400">
            {format(parseISO(post.date), 'MMMM dd, yyyy')}
          </div>
          {post.image && (
            <Image
              src={`${post.image}`}
              layout="responsive"
              width={1000}
              height={666}
            />
          )}

          <div className="p-3">
            <h1 className="mb-2 text-3xl">
              <Link as={`/${post.slug}`} href={`/[slug]`}>
                <a className="text-gray-900 dark:text-white dark:hover:text-emerald-400 ">
                  {post.title}
                </a>
              </Link>
            </h1>
            <p className="mb-3">{post.description}</p>
            <p>
              <Link as={`/${post.slug}`} href={`/[slug]`}>
                <a>Read More</a>
              </Link>
            </p>
          </div>
        </article>
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();

  const sanityImages = await sanityClient.fetch(groq`
  *[_type == "imageWrapper"]{
    name,
    "slug": slug.current,
    ...
   image.asset->
  }
  
    `);

  // console.log(sanityImages);
  return {
    props: {
      posts,
      sanityImages,
    },
  };
};

export default Index;
