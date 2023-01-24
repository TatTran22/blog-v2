import ListTags from '@/components/pages/tag/ListTags'
import { getAllTags, getAllTagsWithCount } from '@/lib/sanity.client'

export default async function Blog() {
  const tags = await getAllTags()

  return <ListTags tags={tags} />
}

// FIXME: remove the `revalidate` export below once you've followed the instructions in `/pages/api/revalidate.ts`
export const revalidate = 1
