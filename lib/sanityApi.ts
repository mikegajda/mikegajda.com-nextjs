import sanityClient from '@sanity/client';
import { uuid } from '@sanity/uuid';
import groq from 'groq';

export const MAX_POSTS_PER_PAGE = 2;

const client = sanityClient({
  projectId: '0zzwwluw', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  apiVersion: '2021-04-17',
  useCdn: false, // `false` if you want to ensure fresh data
});

const authedClient = sanityClient({
  projectId: '0zzwwluw', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  apiVersion: '2021-04-17',
  token: process.env.SANITY_TOKEN, // or the token you chose in step 3
  useCdn: false, // `false` if you want to ensure fresh data
});

export const getCountOfAllPosts = async (): Promise<number> => {
  return await client.fetch(
    groq`
    count(*[_type == "post"])
    `
  );
};

export type LinkType = {
  url: string;
  title: string;
  description: string;
};

export const createOrUpdateLink = async (link: LinkType): Promise<any> => {
  const existingLink = await client.fetch(
    groq`*[_type == "link" && url == $url]{_id}`,
    { url: link.url }
  );
  let id = uuid();
  if (existingLink.length > 0) {
    id = existingLink[0]._id;
  }
  return await authedClient.createOrReplace({
    _id: id,
    _type: 'link',
    title: link.title,
    url: link.url,
    description: link.description,
  });
};

export const getPosts = async (start, end) => {
  return await client.fetch(
    groq`
        *[_type == "post"] | order(publishedAt desc) {
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
        }[$start...$end]`,
    { start, end }
  );
};

export const getAllPostSlugs = async () => {
  return await client.fetch(
    groq`
        *[_type == "post"] | order(publishedAt desc) {
          'slug': slug.current
        }`
  );
};

export const getPostForSlug = async (slug: string) => {
  return await client.fetch(
    groq`
        *[_type == "post" && slug.current == $slug] {
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
        }`,
    {
      slug,
    }
  );
};
