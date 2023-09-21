'use client'
import { Provider } from '@supabase/supabase-js'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import { useSupabase } from './providers/supabase-provider'

interface ProviderProps {
  name: Provider
  icon: JSX.Element
  title: string
}

const providers: ProviderProps[] = [
  {
    name: 'github',
    icon: <FaGithub className="h-6 w-6" />,
    title: 'GitHub',
  },
  {
    name: 'google',
    icon: <FcGoogle className="h-6 w-6" />,
    title: 'Google',
  },
]

export default function SignInWithProviders() {
  const { supabase, session } = useSupabase()

  const handleProviderSignIn = async (provider: Provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
      })

      if (error) throw error
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <div className="flex items-center justify-center space-x-4 p-6 md:space-x-6">
      {providers.map((provider) => (
        <button
          className="mb-1 mr-2 flex items-center justify-center rounded bg-white px-4 py-2 text-base font-normal uppercase text-gray-800 shadow-lg outline-none hover:shadow-md focus:outline-none active:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:shadow-gray-900 dark:hover:shadow-md"
          type="button"
          key={provider.name}
          style={{ transition: 'all .15s ease' }}
          onClick={() => handleProviderSignIn(provider.name)}
        >
          <span className="mr-2">{provider.icon}</span>
          <span className="text-sm font-bold">{provider.title}</span>
        </button>
      ))}
    </div>
  )
}
