import MetaTags from 'components/MetaTags'
import { getPostBySlug, getSettings } from 'lib/sanity.client'
import { urlForImage } from 'lib/sanity.image'

export default async function SlugHead({ params }: { params: { slug: string } }) {
  const { current } = await getPostBySlug(params.slug)
  const data = await getSettings()
  const currentUrl = `${process.env.VERCEL_URL.startsWith('localhost') ? 'http' : 'https'}://${
    process.env.VERCEL_URL
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
