'use client'

import { genPageMetadata } from 'app/seo'
import type { Authors } from 'contentlayer/generated'
import { allResumes, Resume } from 'contentlayer/generated'
import { MDXComponents } from 'mdx/types'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { useCallback, useEffect, useState } from 'react'
import { GrGithub, GrLocation, GrMail, GrSkype } from 'react-icons/gr'

import Image from '@/components/Image'
import { components as baseComponents } from '@/components/MDXComponents'
import SocialIcon from '@/components/social-icons'

export default function ResumePage() {
  const resume = allResumes.find((p) => p.slug === 'tattran') as Resume
  const [isPageReady, setIsPageReady] = useState(false)

  if (!resume) {
    throw new Error(`Cannot find resume with slug "${'tattran'}"`)
  }

  const components: MDXComponents = {
    ...baseComponents,
    h2: (props) => (
      <h2
        className="mb-2 mt-4 border-b-2 text-lg font-bold leading-6 tracking-wide text-primary-600"
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
      <a className="text-blue-500 hover:underline" {...props}>
        {props.children}
      </a>
    ),
    blockquote: (props) => (
      <blockquote className="my-4 border-l-4 border-gray-300 pl-4" {...props} />
    ),
  }

  return (
    <>
      <article
        id="baseResume"
        // eslint-disable-next-line tailwindcss/classnames-order
        className="relative min-h-[11.69in] w-[8.27in] mt-[0.39in] mb-[0.38in] ml-[0.39in] mr-[0.38in] print:block print:m-0"
        // ref={resumeRef}
      >
        <div className="flex flex-row space-x-6">
          <div className="flex flex-col items-center space-x-2">
            {resume.avatar && (
              <Image
                src={resume.avatar}
                alt={resume.name}
                width={144}
                height={144}
                className="rounded-full"
              />
            )}
          </div>
          <div className="col-span-2 flex flex-col space-y-1">
            <h1 className="mb-2 pb-2 pt-3 font-serif text-6xl font-bold leading-8 tracking-tight text-primary-600">
              {resume.name}
            </h1>
            <h4 className="font-serif text-2xl font-semibold leading-8 tracking-tight text-gray-700">
              {resume.occupation}
            </h4>
            <div className="flex flex-row space-x-6 text-base">
              <div className="flex flex-row items-center justify-center space-x-1">
                <GrMail className="h-4 w-4" />
                <a className="text-base" href={`mailto:${resume.email}`} target="_blank">
                  {resume.email}
                </a>
              </div>
              <div className="flex flex-row items-center justify-center space-x-1">
                <GrSkype className="h-4 w-4" />
                <a className="text-base" href={`skype:${resume.skype}?chat`} target="_blank">
                  {resume.skype}
                </a>
              </div>
              <div className="flex flex-row items-center justify-center space-x-1">
                <GrGithub className="h-4 w-4" />
                <a
                  className="text-base"
                  href={`https://github.com/${resume.github}`}
                  target="_blank"
                >
                  {resume.github}
                </a>
              </div>
            </div>
            <address className="flex flex-row items-center  space-x-1">
              <GrLocation className="h-4 w-4" />
              <a
                className="text-base"
                href={`https://maps.app.goo.gl/xMBVW59dfBiKJB6a7`}
                target="_blank"
              >
                {resume.address}
              </a>
            </address>
          </div>
        </div>
        <MDXLayoutRenderer code={resume.body.code} components={components} />
      </article>
    </>
  )
}
