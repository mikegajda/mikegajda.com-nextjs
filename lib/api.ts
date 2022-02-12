import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { POSTS_PATH } from '../utils/mdxUtils';

export function getPostSlugs(): string[] {
  return fs.readdirSync(POSTS_PATH);
}

type PostItems = {
  [key: string]: string;
};

export function getPostBySlug(slug: string, fields: string[] = []): PostItems {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(POSTS_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: PostItems = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

const fields = ['date', 'description', 'slug', 'title', 'image', 'type'];

const MAX_POSTS = 1;

export function getAllPosts(): PostItems[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

function paginate(arr, size) {
  return arr.reduce((acc, val, i) => {
    const idx = Math.floor(i / size);
    const page = acc[idx] || (acc[idx] = []);
    page.push(val);

    return acc;
  }, []);
}

export function getSortedFilteredPaginatedPosts(
  filter: (a: PostItems) => boolean,
  maxPosts: number = MAX_POSTS
): PostItems[][] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter(filter)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  const pages = paginate(posts, maxPosts);
  return pages;
}
