import { FiSettings } from 'react-icons/fi'
import { defineField, defineType } from 'sanity'

import OpenGraphInput from './OpenGraphInput'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: FiSettings,
  preview: { select: { title: 'title', subtitle: 'description' } },
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your blog.',
      title: 'Title',
      type: 'string',
      initialValue: "Tat Tran's Blog",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'owner',
      title: 'Site owner',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      description: 'Used both for the <meta> description tag for SEO, and the blog subheader.',
      title: 'Description',
      type: 'string',
      initialValue: 'A blog about software engineering, web development, and life.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      description: 'Used for social media previews when linking to the index page.',
      type: 'object',
      components: {
        input: OpenGraphInput,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: "Tat Tran's Blog",
        }),
      ],
    }),
  ],
})
