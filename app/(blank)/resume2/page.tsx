'use client'

import { allResumes, Resume } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { GrGithub, GrLocation, GrMail, GrSkype } from 'react-icons/gr'

import Image from '@/components/Image'
import { ResumeContactComponents, ResumeMDXComponents } from '@/components/ResumeComponents'

export default function ResumePage() {
  const resume = allResumes.find((p) => p.slug === 'tattran') as Resume

  if (!resume) {
    throw new Error(`Cannot find resume with slug "${'tattran'}"`)
  }
  const { Name, Occupation, Github, Skype, Address, Email } = ResumeContactComponents

  return (
    <>
      <article id="baseResume" className="relative min-h-[11.69in]">
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
            <Name>{resume.name}</Name>
            <Occupation>{resume.occupation}</Occupation>
            <div className="flex flex-row space-x-6 text-base">
              {!!resume.email && <Email email={resume.email} />}
              {!!resume.skype && <Skype skype={resume.skype} />}
              {!!resume.github && <Github github={resume.github} />}
            </div>
            {!!resume.address && <Address address={resume.address} />}
          </div>
        </div>
        <MDXLayoutRenderer code={resume.body.code} components={ResumeMDXComponents} />
      </article>
    </>
  )
}
