import { FaBook, FaTags, FaUser } from 'react-icons/fa'
import { FiExternalLink, FiLink2 } from 'react-icons/fi'
import { defineArrayMember, defineType } from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      marks: {
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            icon: FiExternalLink,
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            icon: FiLink2,
            fields: [
              {
                name: 'reference',
                type: 'reference',
                to: [
                  { type: 'author', icon: FaUser, title: 'Author' },
                  { type: 'post', title: 'Post', icon: FaBook },
                  { type: 'category', title: 'Category', icon: FaTags },
                ],
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
    }),
    defineArrayMember({
      type: 'code',
      options: {
        withFilename: true,
        theme: 'github',
      },
    }),
  ],
})
