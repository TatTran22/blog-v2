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
        {
          'font-semibold text-gray-800 dark:text-gray-200': isActive,
          'font-normal text-gray-600 dark:text-gray-400': !isActive,
        },
        'hidden rounded-lg p-1 transition-all hover:bg-gray-200 dark:hover:bg-gray-800 sm:px-3 sm:py-2 md:inline-block'
      )}
    >
      <span className="capsize">{text}</span>
    </NextLink>
  )
}
