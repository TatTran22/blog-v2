'use client'
import { usePathname } from 'next/navigation'

import Footer from '@/components/Footer'
import MobileMenu from '@/components/MobileMenu'
import { Author } from '@/lib/types'

import ButtonThemeSwitch from './ButtonThemeSwitch'
import NavItem from './NavItem'

interface ContainerProps {
  children: React.ReactNode
  siteOwner: Author
}

export default function Container(props: ContainerProps) {
  const { children, siteOwner } = props
  const pathName = usePathname()

  if (pathName.startsWith('/studio')) return <>{children}</>

  return (
    <div className="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="flex flex-col justify-center px-8">
        <nav className="relative flex items-center justify-between flex-1 w-full pt-8 pb-8 text-gray-900 border-gray-200 dark:border-gray-700 sm:pb-16 bg-gray-50 dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
          <div className="ml-[-0.60rem]">
            <MobileMenu />
            <NavItem href="/" text="Home" />
            <NavItem href="/posts" text="Blog" />
            <NavItem href="/about" text="About" />
          </div>
          <ButtonThemeSwitch />
        </nav>
      </div>
      <main className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900">
        {children}
        <Footer owner={siteOwner} />
      </main>
    </div>
  )
}
