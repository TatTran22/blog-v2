import BlogMeta from 'components/BlogMeta'
import { getPostBySlug, getSettings } from 'lib/sanity.client'
import { urlForImage } from 'lib/sanity.image'

export default async function SlugHead({ params }: { params: { slug: string } }) {
  const { current } = await getPostBySlug(params.slug)
  const data = await getSettings()
  return (
    <>
      <title>{current && current.title ? `${current.title} | ${data.title}` : data.title}</title>
      <BlogMeta />
      {current && current.coverImage?.asset?._ref && (
        <meta
          property="og:image"
          content={urlForImage(current.coverImage).width(1200).height(627).fit('crop').url()}
        />
      )}
    </>
  )
}
