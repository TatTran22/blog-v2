import { allPrivacies, Privacy } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'

import { PolicyMDXComponents } from '@/components/PolicyComponents'

export default async function PrivacyPage() {
  const resume = allPrivacies.find((p) => p.slug === 'default') as Privacy

  if (!resume) {
    throw new Error(`Cannot find resume with slug "${'tattran'}"`)
  }
  return <MDXLayoutRenderer code={resume.body.code} components={PolicyMDXComponents} />
}
