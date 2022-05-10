import sanityClient from '@sanity/client';
import { uuid } from '@sanity/uuid';
import groq from 'groq';
import { DocumentsPageStaticProps } from '../types/props';

export const MAX_POSTS_PER_PAGE = 2;

const authedClient = sanityClient({
  projectId: '0zzwwluw', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  apiVersion: '2021-04-17',
  token: process.env.SANITY_TOKEN, // or the token you chose in step 3
  useCdn: false, // `false` if you want to ensure fresh data
});

export const getCountOfAllPosts = async (): Promise<number> => {
  return await getCountOfDocumentsByType('post');
};

export const getCountOfDocumentsByType = async (
  documentType: string
): Promise<number> => {
  return await authedClient.fetch(
    groq`
    count(*[_type == $documentType])
    `,
    { documentType }
  );
};

export type LinkType = {
  url: string;
  title: string;
  description: string;
};

export const createOrUpdateLink = async (link: LinkType): Promise<any> => {
  const existingLink = await authedClient.fetch(
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

const commonPostFields = `{
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
    _type == 'gallery' => {
      images[]{
        _type == 'reference' => @->{
        ...,
        'image': {
          ...image,
          'asset': image.asset->
        }
       }
      },
      "_type": "gallery"
    },
    _type != 'imageWrapper' && _type != 'gallery' => @,
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
}`;

export const getPostsBySlice = async (
  start: number,
  end: number
): Promise<any[]> => {
  return await authedClient.fetch(
    groq`
        *[_type == "post"] | order(publishedAt desc) ${commonPostFields}[$start...$end]`,
    { start, end }
  );
};

export const getAllSlugsByDocumentType = async (documentType: string) => {
  return await authedClient.fetch(
    groq`
        *[_type == $documentType] {
          'slug': slug.current
        }`,
    { documentType }
  );
};

export const getAllPostSlugs = async () => {
  return await getAllSlugsByDocumentType('post');
};

export const getPostForSlug = async (slug: string) => {
  return await authedClient.fetch(
    groq`
        *[_type == "post" && slug.current == $slug] ${commonPostFields}`,
    {
      slug,
    }
  );
};

export const getAllImageSlugs = async () => {
  return await authedClient.fetch(
    groq`
        *[_type == "imageWrapper"] {
          'slug': image.slug.current
        }`
  );
};

export const getImageForSlug = async (slug: string) => {
  return await authedClient.fetch(
    groq`
        *[_type == "imageWrapper" && image.slug.current == $slug] {
          ...,
          'image': {
            ...image,
           'asset': image.asset->
           }
          }`,
    {
      slug,
    }
  );
};

export const getStaticPropsForDocumentsPage = async (
  getDocumentsTotalCount: () => Promise<number>,
  getDocuments: (pageStart, pageEnd) => Promise<any[]>,
  maxDocumentsPerPage: number,
  pageNumber: number
) => {
  const documents = await getDocuments(
    pageNumber * maxDocumentsPerPage,
    pageNumber * maxDocumentsPerPage + maxDocumentsPerPage
  );

  const documentsTotalCount = await getDocumentsTotalCount();

  const pagesCount = Math.ceil(documentsTotalCount / MAX_POSTS_PER_PAGE);
  return {
    props: {
      pageNumber,
      documents,
      documentsTotalCount,
      pagesCount,
    },
  };
};

export const getStaticPropsForPostsPage = async (
  pageNumber: number
): Promise<DocumentsPageStaticProps> => {
  return getStaticPropsForDocumentsPage(
    getCountOfAllPosts,
    getPostsBySlice,
    MAX_POSTS_PER_PAGE,
    pageNumber
  );
};
