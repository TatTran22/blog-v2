import IndexPage from 'components/pages/homepage/IndexPage'
import { getFeaturedPosts, getSettings } from 'lib/sanity.client'

export default async function IndexRoute() {
  // Fetch queries in parallel
  const [settings, posts] = await Promise.all([
    getSettings(),
    getFeaturedPosts(),
  ])

  return <IndexPage posts={posts} settings={settings} />
}

// FIXME: remove the `revalidate` export below once you've followed the instructions in `/pages/api/revalidate.ts`
export const revalidate = 1
