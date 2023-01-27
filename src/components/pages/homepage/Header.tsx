import { PortableText } from '@portabletext/react'

export default function Header({ title, description }: { title: string; description?: any[] }) {
  return (
    <div className="space-y-2 pt-3 pb-8 md:space-y-5">
      <h4 className="text-lg font-semibold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl sm:leading-10 md:text-3xl md:leading-14">
        Xin chào!{' '}
        <span role="img" aria-label="Xin chào!">
          👋
        </span>
      </h4>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          I&#39;m{' '}
          <span className="background-author-animate bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            {title}
          </span>
          <p className="mt-2 font-serif text-lg leading-7 tracking-wide text-gray-500 dark:text-gray-400">
            <PortableText value={description} />
          </p>
        </h1>
      </div>
    </div>
  )
}
