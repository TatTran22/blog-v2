import { currentUser, SignInButton } from '@clerk/nextjs'
import { allResumes, Resume } from 'contentlayer/generated'

import { ResumePreview } from '@/components/ResumePreview'

export default async function ResumePage() {
  const user = await currentUser()

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-2xl font-semibold">You must be signed in to view this page.</div>
        <div className="text-lg font-semibold text-primary-600 dark:text-primary-400">
          <SignInButton mode="modal" afterSignInUrl="/resume" afterSignUpUrl="/resume">
            Sign in
          </SignInButton>
        </div>
      </div>
    )
  const resume = allResumes.find((p) => p.slug === 'tattran') as Resume

  if (!resume) {
    throw new Error(`Cannot find resume with slug "${'tattran'}"`)
  }

  return (
    <>
      <ResumePreview resume={resume} />
    </>
  )
}
