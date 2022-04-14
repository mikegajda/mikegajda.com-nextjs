
export default {
  name: 'imageWrapper',
  title: 'Image',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: false,
        metadata: ['lqip', 'blurhash', 'palette', 'exif', 'location'],
      },
      fields: [
        {
          name: 'title',
          title: 'Title',
          description: `The title of the image.`,
          type: 'string',
          options: {
            isHighlighted: true,
          },
        },
        {
          name: 'caption',
          type: 'text',
          title: 'Caption',
          rows: 3,
          description: `Text that's displayed with the image`,
          options: {
            isHighlighted: true,
          },
        },
        {
          name: 'altText',
          title: 'Alt Text',
          description: `A short written description of an image`,
          type: 'text',
          rows: 3,
          options: {
            isHighlighted: true,
          },
        },
        {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            isHighlighted: true,
            source: 'image.title',
            maxLength: 96,
          },
        },
      ]
    },
  ],
  preview: {
    select: {
      title: 'image.title',
      subtitle: 'image.caption',
      media: 'image',
    },
  },
};
