import { allResumes, Resume } from 'contentlayer/generated'
import { MDXComponents } from 'mdx/types'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { useCallback, useEffect, useState } from 'react'
import { FaMapLocationDot } from 'react-icons/fa6'
import { GrGithub, GrMail, GrSkype } from 'react-icons/gr'

import Image from '@/components/Image'
import { components as baseComponents } from '@/components/MDXComponents'
export const ResumeMDXComponents: MDXComponents = {
  ...baseComponents,
  h2: (props) => (
    <h2
      className="mb-1 mt-3 border-b-2 text-base font-bold leading-6 tracking-wide text-primary-600 dark:text-primary-400"
      {...props}
    >
      {props.children}
    </h2>
  ),
  h3: (props) => (
    <h3 className="mb-1 mt-2 text-base font-bold" {...props}>
      {props.children}
    </h3>
  ),
  h4: (props) => (
    <h4 className="my-1 text-sm font-semibold" {...props}>
      {props.children}
    </h4>
  ),
  p: (props) => <p className={`indent-10 text-sm leading-normal`} {...props} />,
  ul: (props) => <ul className="list-inside list-disc text-sm" {...props} />,
  ol: (props) => <ol className="list-inside list-decimal text-sm" {...props} />,
  li: (props) => <li className="text-sm" {...props} />,
  a: (props) => (
    <a
      className="text-blue-500 hover:text-blue-600 hover:underline dark:hover:text-blue-400"
      {...props}
    >
      {props.children}
    </a>
  ),
  blockquote: (props) => <blockquote className="my-4 border-l-4 border-gray-300 pl-4" {...props} />,
}

export const ResumeContactComponents = {
  Name: (props) => (
    <h1 className="mb-2 border-gray-300 pb-2 pt-3 font-serif text-6xl font-bold leading-8 tracking-tight text-primary-600 dark:border-gray-700 dark:text-primary-400">
      {props.children}
    </h1>
  ),
  Occupation: (props) => (
    <h4 className="font-serif text-xl font-semibold leading-8 tracking-tight text-secondary-600 dark:text-secondary-400">
      {props.children}
    </h4>
  ),
  Email: ({ email }: { email: string }) => (
    <div className="flex flex-row items-center justify-center space-x-1">
      <GrMail className="h-5 w-5" />
      <a className="text-base" href={`mailto:${email}`} target="_blank">
        {email}
      </a>
    </div>
  ),
  Skype: ({ skype }: { skype: string }) => (
    <div className="flex flex-row items-center justify-center space-x-1">
      <GrSkype className="h-5 w-5" />
      <a className="text-base" href={`skype:${skype}?chat`} target="_blank">
        {skype}
      </a>
    </div>
  ),
  Github: ({ github }: { github: string }) => (
    <div className="flex flex-row items-center justify-center space-x-1">
      <GrGithub className="h-5 w-5" />
      <a className="text-base" href={`https://github.com/${github}`} target="_blank">
        {github}
      </a>
    </div>
  ),
  Address: ({ address }: { address: string }) => (
    <div className="flex flex-row items-center justify-start space-x-1">
      <FaMapLocationDot className="h-5 w-5" />
      <address className="flex flex-row items-center space-x-1">
        <a className="text-base" href={`https://maps.app.goo.gl/xMBVW59dfBiKJB6a7`} target="_blank">
          {address}
        </a>
      </address>
    </div>
  ),
}

const ResumeComponent = ({ className, resume }: { className?: string; resume: Resume }) => (
  <article id="baseResume" className={`relative ${className}`}>
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
        <h1 className="mb-2 border-gray-300 pb-2 pt-3 font-serif text-6xl font-bold leading-8 tracking-tight text-primary-600 dark:border-gray-700 dark:text-primary-400">
          {resume.name}
        </h1>
        <h4 className="font-serif text-xl font-semibold leading-8 tracking-tight text-secondary-600 dark:text-secondary-400">
          {resume.occupation}
        </h4>
        <div className="flex flex-row space-x-6 text-base">
          {!!resume.email && (
            <div className="flex flex-row items-center justify-center space-x-1">
              <GrMail className="h-5 w-5" />
              <a className="text-base" href={`mailto:${resume.email}`} target="_blank">
                {resume.email}
              </a>
            </div>
          )}
          {!!resume.skype && (
            <div className="flex flex-row items-center justify-center space-x-1">
              <GrSkype className="h-5 w-5" />
              <a className="text-base" href={`skype:${resume.skype}?chat`} target="_blank">
                {resume.skype}
              </a>
            </div>
          )}
          {!!resume.github && (
            <div className="flex flex-row items-center justify-center space-x-1">
              <GrGithub className="h-5 w-5" />
              <a className="text-base" href={`https://github.com/${resume.github}`} target="_blank">
                {resume.github}
              </a>
            </div>
          )}
        </div>
        {!!resume.address && (
          <div className="flex flex-row items-center justify-start space-x-1">
            <FaMapLocationDot className="h-5 w-5" />
            <address className="flex flex-row items-center space-x-1">
              <a
                className="text-base"
                href={`https://maps.app.goo.gl/xMBVW59dfBiKJB6a7`}
                target="_blank"
              >
                {resume.address}
              </a>
            </address>
          </div>
        )}
      </div>
    </div>
    <MDXLayoutRenderer code={resume.body.code} components={ResumeMDXComponents} />
  </article>
)

export default ResumeComponent
