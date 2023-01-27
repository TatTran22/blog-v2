import ContainerHeader from 'components/ContainerHeader'
import Image from 'components/Image'
// import { PageSEO } from 'components/SEO'
import { urlForImage } from 'lib/sanity.image'
import type { Author } from 'lib/types'
import { ReactNode } from 'react'
import { FaFacebook, FaGithub } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'

interface Props {
  children: ReactNode
  author: Author
}

export default function AuthorContainer({ children, author }: Props) {
  const { name, occupation, company, avatar, socials } = author

  return (
    <>
      {/* <PageSEO title={`About - ${name}`} description={`About me - ${name}`} /> */}
      <ContainerHeader title="About" />
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center pt-8">
          <Image
            src={urlForImage(avatar).width(768).height(768).url()}
            alt="avatar"
            width={192}
            height={192}
            className="h-auto max-w-full rounded-full border-none align-middle shadow"
          />
          <h3 className="background-author-animate bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight text-transparent">
            {name}
          </h3>
          <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
          <div className="text-gray-500 dark:text-gray-400">{company}</div>
          <div className="flex space-x-3 pt-6">
            <a href={`mailto:${socials.email}`}>
              <FiMail className="h-6 w-6" title="Email" />
            </a>
            <a
              href={`https://github.com/${socials.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="h-6 w-6" title="Github" />
            </a>
            <a
              href={`https://facebook.com/${socials.facebook}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="h-6 w-6" title="Facebook" />
            </a>
          </div>
        </div>
        <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">{children}</div>
      </div>
    </>
  )
}
