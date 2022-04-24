import { PortableTextComponents } from '@portabletext/react';
import LinkPreview from './LinkPreview';
import { SanityImageWrapper } from './SanityImageWrapper';
import Slider from './Slider';
export const globalComponents: PortableTextComponents = {
  block: {
    // Ex. 1: customizing common block types
    h1: ({ children }) => <h1 className="prose">{children}</h1>,
    h2: ({ children }) => <h2 className="prose">{children}</h2>,
    h3: ({ children }) => <h3 className="prose">{children}</h3>,
    h4: ({ children }) => <h4 className="prose">{children}</h4>,
    h5: ({ children }) => <h5 className="prose">{children}</h5>,
    h6: ({ children }) => <h6 className="prose">{children}</h6>,
    p: ({ children }) => <p className="prose">{children}</p>,
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
    gallery: ({ value }) => {
      return <Slider value={value} />;
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
