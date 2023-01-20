import { PortableText } from '@portabletext/react'

import styles from './BlogHeader.module.css'

export default function BlogHero({
  title,
  description,
}: {
  title: string
  description?: any[]
  level: 1 | 2
}) {
  return (
    <div className="pt-3 pb-8 space-y-2 md:space-y-5">
      <h4 className="text-lg font-semibold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl sm:leading-10 md:text-3xl md:leading-14">
        Xin chào!{' '}
        <span role="img" aria-label="Xin chào!">
          👋
        </span>
      </h4>
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          I&#39;m{' '}
          <span className="text-transparent background-author-animate bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text">
            {title}
          </span>
        </h1>
      </div>
      <div
        className={`mt-2 font-serif text-lg leading-7 tracking-wide text-gray-500 dark:text-gray-400 ${styles.portableText}`}
      >
        <PortableText value={description} />
      </div>
    </div>
  )
}
