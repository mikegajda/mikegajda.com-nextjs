export default {
  name: 'post',
  title: 'Post',
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    },

    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'reference',
      to: { type: 'imageWrapper' },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [
        {
          type: 'block'
        },
        {
          title: 'Reference',
          type: 'reference',
          to: [{ type: 'imageWrapper' }, {type: 'link'}, {type: 'gallery'}],
        },
      ],
    },
  ],
  initialValue: () => ({
    publishedAt: (new Date()).toISOString(),
    author: {
      "_ref": "f431f769-fd2b-4b5f-863a-d2833e7dbf43",
      "_type": "reference"
    }
  }),

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
