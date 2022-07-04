import { PortableTextComponents } from '@portabletext/react';
import LinkPreview from './LinkPreview';
import { SanityImageWrapper } from './SanityImageWrapper';
import Gallery from './Gallery';
export const globalComponents: PortableTextComponents = {
  block: {
    // Ex. 1: customizing common block types
    h1: ({ children }) => (
      <h1 className="text-4xl font-semibold mb-2">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mb-2">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mb-2">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg font-semibold mb-2">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base font-semibold">{children}</h6>
    ),
    p: ({ children }) => <p className="prose">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="px-3 py-2 border-emerald-400 dark:border-emerald-600 border-l-2 bg-gray-300 my-3 prose-blockquote dark:bg-gray-800 ">
        {children}
      </blockquote>
    ),

    // Ex. 2: rendering custom styles
    customHeading: ({ children }) => (
      <h2 className="text-lg text-primary text-purple-700">{children}</h2>
    ),
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <ul className="list-disc list-inside">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside">{children}</ol>
    ),
  },
  types: {
    imageWrapper: ({ value }) => (
      <SanityImageWrapper value={value} showExifMetadata={false} />
    ),
    link: LinkPreview,
    gallery: ({ value }) => {
      return <Gallery value={value} />;
    },
  },
};

export function toPlainText(blocks = []) {
  return (
    blocks
      // loop through each block
      .map((block) => {
        // if it's not a text block with children,
        // return nothing
        if (block._type !== 'block' || !block.children) {
          return '';
        }
        // loop through the children spans, and join the
        // text strings
        return block.children.map((child) => child.text).join('');
      })
      // join the paragraphs leaving split by two linebreaks
      .join('\n')
  );
}
