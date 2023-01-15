import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaUserCog,
} from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import { defineField, defineType } from 'sanity'

// export interface Author {
//   name: string
//   slug: string
//   avatar: any
//   bio: any[]
//   occupation?: string
//   company?: string
//   email: string
//   twitter?: string
//   linkedin?: string
//   github?: string
// }
export default defineType({
  name: 'author',
  title: 'Author',
  icon: FaUserCog,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
    }),
    defineField({
      name: 'occupation',
      title: 'Occupation',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'socials',
      title: 'Socials',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'email',
          icon: MdOutlineEmail,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter',
          icon: FaTwitter,
          type: 'string',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook',
          icon: FaFacebook,
          type: 'string',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          icon: FaLinkedin,
          type: 'string',
        }),
        defineField({
          name: 'github',
          title: 'Github',
          icon: FaGithub,
          type: 'string',
        }),
      ],
      preview: {
        select: {
          email: 'email',
          twitter: 'twitter',
          facebook: 'facebook',
          linkedin: 'linkedin',
          github: 'github',
        },
        prepare({ email, twitter, facebook, linkedin, github }) {
          const social = []
          if (email) social.push(email)
          if (twitter) social.push(twitter)
          if (facebook) social.push(facebook)
          if (linkedin) social.push(linkedin)
          if (github) social.push(github)
          return {
            title: social.join(', '),
          }
        },
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'avatar',
    },
  },
})
