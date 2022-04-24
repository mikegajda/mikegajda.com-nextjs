export default {
    name: 'gallery',
    title: 'Gallery',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
      },

      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'imageWrapper' } }],
      },
    ],
  };
  