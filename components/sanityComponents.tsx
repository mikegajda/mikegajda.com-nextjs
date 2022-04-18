import { PortableTextComponents } from '@portabletext/react';
import LinkPreview from './LinkPreview';
import { SanityImageWrapper } from './SanityImageWrapper';
export const globalComponents: PortableTextComponents = {
  block: {
    // Ex. 1: customizing common block types
    h1: ({ children }) => <h1 className="text-2xl">{children}</h1>,
    blockquote: ({ children }) => (
      <blockquote className="px-3 py-2 border-emerald-400 border-l-2 bg-gray-300 my-3 prose-blockquote ">
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
  },
};
