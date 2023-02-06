'use client'
import MobileMenu from 'components/MobileMenu'
import { useSupabase } from 'components/providers/supabase-provider'
import LoginDialog from 'components/SignInDialog'
import { Author, Database } from 'lib/types'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import Footer from './footer'
import NavItem from './nav-item'

interface ContainerProps {
  children: React.ReactNode
  siteOwner: Author
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
]

export default function Container(props: ContainerProps) {
  const { children, siteOwner } = props
  const pathName = usePathname()
  const { supabase, session } = useSupabase()
  const [profile, setProfile] = useState<Database['public']['Tables']['users']['Row'] | null>(null)
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)

  useEffect(() => {
    if (session) {
      const fetchProfile = async () => {
        const { data } = await supabase.from('users').select('*').eq('id', session.user.id).single()
        setProfile(data)
      }
      fetchProfile()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  if (pathName.startsWith('/studio')) return <>{children}</>

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="flex flex-col justify-center px-8">
        <nav className="relative flex w-full flex-1 items-center justify-between border-gray-200 bg-gray-50 bg-opacity-60 pt-8 pb-8 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 sm:pb-16">
          <div className="ml-[-0.60rem]">
            <MobileMenu items={NAV_ITEMS} />
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                isActive={
                  pathName === item.href || (pathName.startsWith(item.href) && item.href !== '/')
                }
              />
            ))}
          </div>
          <div className="flex">
            {!session ? (
              <button className="mr-2" onClick={() => setIsLoginDialogOpen(true)}>
                Sign In
              </button>
            ) : (
              <div className="flex items-center">
                {profile && (
                  <div className="mr-2 flex items-center">
                    <span>{profile.username}</span>
                  </div>
                )}
                <button className="mr-2" onClick={() => supabase.auth.signOut()}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
      <LoginDialog isOpen={isLoginDialogOpen} onClose={() => setIsLoginDialogOpen(false)} />
      <main className="flex flex-col justify-center bg-gray-50 px-8 dark:bg-gray-900">
        <div className="min-h-screen">
          <div className="divide-y">{children}</div>
        </div>
      </main>
      <Footer owner={siteOwner} />
    </div>
  )
}
