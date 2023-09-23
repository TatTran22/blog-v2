import { allResumes, Resume } from 'contentlayer/generated'

import Image from '@/components/Image'
import ResumeComponent from '@/components/ResumeComponents'

export default function ResumePage() {
  const resume = allResumes.find((p) => p.slug === 'tattran') as Resume

  if (!resume) {
    throw new Error(`Cannot find resume with slug "${'tattran'}"`)
  }

  return (
    <>
      <ResumeComponent resume={resume} />
    </>
  )
}
