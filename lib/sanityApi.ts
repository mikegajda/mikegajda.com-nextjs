import sanityClient from '@sanity/client';
import groq from 'groq';

export const MAX_POSTS_PER_PAGE = 2;

const client = sanityClient({
  projectId: '0zzwwluw', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  useCdn: false, // `false` if you want to ensure fresh data
});

export const getCountOfAllPosts = async (): Promise<number> => {
  return await client.fetch(
    groq`
    count(*[_type == "post"])
    `
  );
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
