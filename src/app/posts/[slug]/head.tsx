import MetaTags from 'components/MetaTags'
import { getPostBySlug, getSettings } from 'lib/sanity.client'
import { urlForImage } from 'lib/sanity.image'

export default async function SlugHead({ params }: { params: { slug: string } }) {
  const { current } = await getPostBySlug(params.slug)
  const data = await getSettings()
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'localhost:3000'
  const currentUrl = `${
    process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL : vercelUrl
  }/posts/${params.slug}`

  return (
    <>
      <MetaTags
        title={current ? `${current.title} | ${data.title}` : data.title}
        description={current ? current.excerpt : data.description}
        url={currentUrl}
        image={
          current?.coverImage?.asset?._ref
            ? urlForImage(current.coverImage).width(1200).height(627).fit('crop').url()
            : undefined
        }
      />
    </>
  )
}
