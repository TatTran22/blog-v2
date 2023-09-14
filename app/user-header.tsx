'use client'
import { useLoginDialog } from 'components/providers/login-dialog-provider'
import { useSupabase } from 'components/providers/supabase-provider'
import { Database } from 'lib/types'
import { useEffect, useState } from 'react'

export default function UserHeader() {
  // const [session, setSession] = useState<Session | null>(serverSession)
  const { supabase, session } = useSupabase()
  const { open } = useLoginDialog()

  const [profile, setProfile] = useState<Database['public']['Tables']['users']['Row'] | null>(null)

  // useEffect(() => {
  //   setSession(serverSession)
  // }, [serverSession])

  // useEffect(() => {
  //   const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
  //     setSession(session)
  //   })

  //   return () => {
  //     authListener?.subscription?.unsubscribe()
  //   }
  // }, [supabase])

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

  return (
    <div className="flex">
      {!session || !profile ? (
        <button className="mr-2" onClick={open}>
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
  )
}
