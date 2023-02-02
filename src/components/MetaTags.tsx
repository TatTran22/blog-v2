import { toPlainText } from '@portabletext/react'

export default function MetaTags({
  title,
  description,
  url,
  image,
}: {
  title: string
  description: string | any[]
  url?: string
  image?: string
}) {
  const descriptionText = typeof description === 'string' ? description : toPlainText(description)
  const siteUrl = url ? url : process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''
  const imageUrl = image ? image : '/images/tattran-square1.png'
  return (
    <>
      <title>{title}</title>
      <meta key="description" name="description" content={descriptionText} />

      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />

      {/*Google / Search Engine Tags */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={descriptionText} />
      <meta itemProp="image" content={imageUrl} />

      {/*Facebook Meta Tags*/}
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={descriptionText} />
      <meta property="og:image" content={imageUrl} />

      {/*Twitter Meta Tags*/}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={descriptionText} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  )
}
