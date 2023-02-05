import { PortableTextReactComponents, toPlainText } from '@portabletext/react'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import slugify from 'slugify'

import Pre from './pre'

const BlogContentPortableComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }

      return <Image alt={value.alt || ' '} loading="lazy" src={urlForImage(value).url()} />
    },
    code: ({ value }) => <Pre value={value} />,
  },

  marks: {
    link: ({ children, value }) => {
      if (!value.href.startsWith('/')) {
        return (
          <a href={value.href} rel="noreferrer noopener" target="_blank">
            {children}
          </a>
        )
      }

      return <a href={value.href}>{children}</a>
    },
  },
  block: {
    h2: ({ children, value }) => {
      const slug = slugify(toPlainText(value))
      return <h2 id={slug}>{children}</h2>
    },
    h3: ({ children, value }) => {
      const slug = slugify(toPlainText(value))
      return <h3 id={slug}>{children}</h3>
    },
  },
}

export default BlogContentPortableComponents
