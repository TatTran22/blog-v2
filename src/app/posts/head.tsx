import MetaTags from 'components/MetaTags'
import { getSettings } from 'lib/sanity.client'
import { urlForImage } from 'lib/sanity.image'

export default async function SlugHead({ params }: { params: { slug: string } }) {
  const data = await getSettings()
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'localhost:3000'
  const currentUrl = `${
    process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL : vercelUrl
  }/posts/${params.slug}`
  const { owner } = data

  return (
    <>
      <MetaTags
        title={`Blog Posts | ${data.title}`}
        description={owner && owner.bio ? owner.bio : data.description}
        url={currentUrl}
        image={
          owner?.avatar?.asset?._ref
            ? urlForImage(owner.avatar).width(1200).height(630).url()
            : undefined
        }
      />
    </>
  )
}
