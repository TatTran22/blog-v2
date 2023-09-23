import { allResumes, Resume } from 'contentlayer/generated'
import { MDXComponents } from 'mdx/types'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { useCallback, useEffect, useState } from 'react'
import { FaMapLocationDot } from 'react-icons/fa6'
import { GrGithub, GrMail, GrSkype } from 'react-icons/gr'

import Image from '@/components/Image'
import { components as baseComponents } from '@/components/MDXComponents'

export const PolicyMDXComponents: MDXComponents = {
  ...baseComponents,
  h1: (props) => (
    <h1
      className="mb-2 border-gray-300 pb-2 pt-3 font-serif text-6xl font-bold leading-8 tracking-tight text-primary-600 dark:border-gray-700 dark:text-primary-400"
      {...props}
    >
      {props.children}
    </h1>
  ),
  h2: (props) => (
    <h2
      className="mb-1 mt-3 text-lg font-bold leading-6 tracking-wide text-primary-600 dark:text-primary-400"
      {...props}
    >
      {props.children}
    </h2>
  ),
  h3: (props) => (
    <h3 className="mb-1 mt-2 text-lg font-bold" {...props}>
      {props.children}
    </h3>
  ),
  h4: (props) => (
    <h4 className="my-1 text-base font-semibold" {...props}>
      {props.children}
    </h4>
  ),
  p: (props) => <p className={`indent-10 text-base leading-normal`} {...props} />,
  ul: (props) => <ul className="list-inside list-disc text-base" {...props} />,
  ol: (props) => <ol className="list-inside list-decimal text-base" {...props} />,
  li: (props) => <li className="text-base" {...props} />,
  a: (props) => (
    <a
      className="text-base text-blue-500 hover:text-blue-600 hover:underline dark:hover:text-blue-400"
      {...props}
    >
      {props.children}
    </a>
  ),
  blockquote: (props) => <blockquote className="my-4 border-l-4 border-gray-300 pl-4" {...props} />,
}
