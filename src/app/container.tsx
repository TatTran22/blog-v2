import MobileMenu from 'components/MobileMenu'
import { Author } from 'lib/types'
// import { usePathname } from 'next/navigation'
import { Suspense } from 'react'

import ContainerHeader from './container-header'
import Footer from './footer'
import NavItem from './nav-item'
import UserHeader from './user-header'

interface ContainerProps {
  children: React.ReactNode
  siteOwner: Author
  heading?: string
}

const NAV_ITEMS = [
  {
    text: 'Home',
    href: '/',
    transitionDelay: '150ms',
  },
  {
    text: 'Blog',
    href: '/posts',
    transitionDelay: '175ms',
  },
  {
    text: 'About',
    href: '/about',
    transitionDelay: '200ms',
  },
  {
    text: 'Guestbook',
    href: '/guestbook',
    transitionDelay: '225ms',
  },
]

export default function Container(props: ContainerProps) {
  const { children, siteOwner, heading } = props

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="flex flex-col justify-center px-8">
        <nav className="relative flex w-full flex-1 items-center justify-between border-gray-200 bg-gray-50 bg-opacity-60 pt-4 pb-4 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
          <div className="ml-[-0.60rem]">
            <MobileMenu items={NAV_ITEMS} />
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </div>
          <Suspense fallback={null}>
            <UserHeader />
          </Suspense>
        </nav>
      </div>

      <main className="flex-1 justify-center bg-gray-50 px-8 dark:bg-gray-900">
        {heading && <ContainerHeader title={heading} />}
        <div className="divide-y">{children}</div>
      </main>
      <Footer owner={siteOwner} />
    </div>
  )
}
