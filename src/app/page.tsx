import { getFeaturedPosts, getSettings } from 'lib/sanity.client'

import Container from './container'
import PostCard from './post-card'

export default async function IndexRoute() {
  // Fetch queries in parallel
  const [settings, posts] = await Promise.all([getSettings(), getFeaturedPosts()])
  const { owner, description } = settings

  return (
    <>
      <Container siteOwner={owner}>
        <div className="space-y-2 pt-3 pb-8 md:space-y-5">
          <h4 className="space-x-4 text-lg font-semibold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl sm:leading-10 md:text-3xl md:leading-14">
            Xin chào!
            <span role="img" aria-label="Xin chào!" className="animate-wave text-4xl">
              👋
            </span>
          </h4>
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              I&#39;m{' '}
              <span className="background-author-animate bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                {owner.name}
              </span>
            </h1>
          </div>
          <div
            className={`mt-2 font-serif text-lg leading-7 tracking-wide text-gray-500 dark:text-gray-400`}
          >
            {description}
          </div>
        </div>
        <ul>
          {posts.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </ul>
      </Container>
    </>
  )
}

export const revalidate = 60

export async function generateMetadata() {
  const settings = await getSettings()

  return {
    title: settings.title,
    description: settings.description,
    openGraph: {
      title: settings.title,
      description: settings.description,
      url: `https://tattran.com`,
      images: [
        {
          url: 'https://tattran.com/images/tattran-square1.png',
          width: 1200,
          height: 1200,
          alt: 'Tat Tran',
        },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
    },
  }
}
