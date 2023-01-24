'use client'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import { useSupabase } from './providers/supabase-provider'

export default function SignInWithProviders() {
  const { supabase, session } = useSupabase()

  const handleProviderSignIn = async (provider: 'github' | 'google') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    })

    if (error) {
      console.log({ error })
    }
  }
  return (
    <div className="flex items-center justify-center p-6 space-x-4 md:space-x-6">
      <button
        className="inline-flex items-center justify-center px-4 py-2 mb-1 mr-2 text-xs font-normal text-gray-800 uppercase bg-white rounded shadow outline-none active:bg-gray-100 focus:outline-none hover:shadow-md"
        type="button"
        style={{ transition: 'all .15s ease' }}
        onClick={() => handleProviderSignIn('github')}
      >
        <FaGithub className="w-6 h-6 mr-2" />
        GitHub
      </button>
      <button
        className="inline-flex items-center justify-center px-4 py-2 mb-1 mr-2 text-xs font-normal text-gray-800 uppercase bg-white rounded shadow outline-none active:bg-gray-100 focus:outline-none hover:shadow-md"
        type="button"
        style={{ transition: 'all .15s ease' }}
        onClick={() => handleProviderSignIn('google')}
      >
        <FcGoogle className="w-6 h-6 mr-2" />
        Google
      </button>
    </div>
  )
}
