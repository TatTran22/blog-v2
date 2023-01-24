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
    icon: <FaGithub className="w-6 h-6" />,
    title: 'GitHub',
  },
  {
    name: 'google',
    icon: <FcGoogle className="w-6 h-6" />,
    title: 'Google',
  },
]

export default function SignInWithProviders() {
  const { supabase, session } = useSupabase()

  const handleProviderSignIn = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    })

    if (error) {
      console.log({ error })
    }
  }

  return (
    <div className="flex items-center justify-center p-6 space-x-4 md:space-x-6">
      {providers.map((provider) => (
        <button
          className="flex items-center justify-center px-4 py-2 mb-1 mr-2 font-normal text-gray-800 uppercase bg-white rounded shadow-lg outline-none text-md active:bg-gray-100 focus:outline-none hover:shadow-md dark:bg-gray-800 dark:text-gray-100 dark:hover:shadow-md dark:shadow-gray-900"
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
