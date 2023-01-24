'use client'
import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'

// import { FcGoogle } from 'react-icons/fc'
import { useSupabase } from './providers/supabase-provider'
import Toast from './Toast'

const providers = [
  {
    name: 'github',
    icon: FaGithub,
    title: 'GitHub',
  },
  // {
  //   name: 'google',
  //   icon: FcGoogle,
  //   title: 'Google',
  // },
]

export default function SignInWithProviders() {
  const { supabase, session } = useSupabase()
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'danger' | 'warning'
  } | null>(null)

  const handleProviderSignIn = async (provider: 'github' | 'google') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    })

    if (error) {
      console.log({ error })
      setToast({
        message: error.message,
        type: 'danger',
      })
    } else {
      setToast({
        message: 'Signed in successfully',
        type: 'success',
      })
    }
  }

  return (
    <div className="flex items-center justify-center p-6 space-x-4 md:space-x-6">
      {toast ? (
        <Toast {...toast} />
      ) : (
        providers.map((provider) => (
          <button
            className="flex items-center justify-center px-4 py-2 mb-1 mr-2 font-normal text-gray-800 uppercase bg-white rounded shadow outline-none text-md active:bg-gray-100 focus:outline-none hover:shadow-md"
            type="button"
            key={provider.name}
            style={{ transition: 'all .15s ease' }}
            onClick={() => handleProviderSignIn('github')}
          >
            <provider.icon className="w-6 h-6 mr-1" />
            <span className="text-sm font-bold">{provider.title}</span>
          </button>
        ))
      )}
    </div>
  )
}
