'use client'
import cn from 'classnames'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavItem({ href, text }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <NextLink
      href={href}
      className={cn(
        isActive
          ? 'font-semibold text-gray-800 dark:text-gray-200'
          : 'font-normal text-gray-600 dark:text-gray-400',
        'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'
      )}
    >
      <span className="capsize">{text}</span>
    </NextLink>
  )
}
