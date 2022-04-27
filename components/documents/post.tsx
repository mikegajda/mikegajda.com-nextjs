import { PortableText } from '@portabletext/react';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { MetaProps } from '../../types/layout';
import { PostType } from '../../types/post';
import { DocumentsPageProps } from '../../types/props';
import Layout, { MAX_WIDTH_CLASS } from '../Layout';
import { PageNavigation } from '../PageNavigation';
import { globalComponents } from '../sanityComponents';
import { SanityImageWrapper } from '../SanityImageWrapper';

export interface SinglePostProps {
  post: PostType;
  index: number;
}
export const Post = ({ post, index }: SinglePostProps): JSX.Element => {
  const background =
    index % 2 === 0
      ? 'bg-gray-100 dark:bg-gray-500'
      : 'bg-gray-200 dark:bg-gray-600';
  return (
    <article key={post.slug.current} className={` ${background}`}>
      <div className={`${MAX_WIDTH_CLASS} mx-auto p-2 py-4 md:px-4`}>
        <div className="text-sm mb-1 text-gray-600 dark:text-gray-200">
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

export interface PostsPageProps extends DocumentsPageProps {
  pageNumber: number;
  documents: PostType[];
  documentsTotalCount: number;
  pagesCount: number;
  customMetadata?: MetaProps;
}

export const PostsPage = ({
  documents,
  pageNumber,
  pagesCount,
  customMetadata,
}: PostsPageProps): JSX.Element => {
  return (
    <Layout customMeta={customMetadata}>
      {documents.map((post, index) => (
        <Post key={post.slug.current} post={post} index={index} />
      ))}
      {pagesCount > 0 && (
        <PageNavigation
          currentPage={pageNumber}
          totalPages={pagesCount}
          basePath="posts"
        />
      )}
    </Layout>
  );
};
