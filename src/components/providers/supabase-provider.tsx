'use client'

import type { Session, SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { createBrowserClient } from 'lib/supabase-browser'
import { Database } from 'lib/types'
import { createContext, useContext, useEffect, useState } from 'react'

type MaybeSession = Session | null

type SupabaseContext = {
  supabase: SupabaseClient<Database>
  session: MaybeSession
  profiles: Profile[]
}

// @ts-ignore
const Context = createContext<SupabaseContext>()

type Profile = Database['public']['Tables']['users']['Row']

export default function SupabaseProvider({
  children,
  session,
  profiles,
}: {
  children: React.ReactNode
  session: MaybeSession
  profiles: Database['public']['Tables']['users']['Row'][]
}) {
  const [supabase] = useState(() => createBrowserClient())
  const [profilesState, setProfilesState] = useState(profiles)

  useEffect(() => {
    setProfilesState(profiles)
  }, [profiles])

  useEffect(() => {
    const getProfiles = async () => {
      const { data: profiles, error } = await supabase.from('users').select('*')

      if (error) {
        console.error(error)
      }

      setProfilesState(profiles)
    }

    getProfiles()

    const subscription = supabase
      .channel('users_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, (payload) => {
        console.log('postgres_changes', payload)
        setProfilesState((profiles) => {
          const { new: newProfile, old: oldProfile } = payload

          if (oldProfile) {
            const index = profiles.findIndex((profile) => profile.id === oldProfile.id)
            if (index !== -1) {
              profiles[index] = newProfile as Profile
            }
          } else {
            profiles.push(newProfile as Profile)
          }

          return profiles
        })
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Context.Provider value={{ supabase, session, profiles: profilesState }}>
      <>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = () => useContext(Context)
