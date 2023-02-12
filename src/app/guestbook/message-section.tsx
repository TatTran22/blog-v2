'use client'
import { useSupabase } from 'components/providers/supabase-provider'
import type { Database, Message } from 'lib/types'
import { useEffect, useState } from 'react'

import MessageCard from './message-card'
import NewMessage from './new-message'

interface Props {
  channel: Database['public']['Tables']['channels']['Row']
  serverMessages: Message[]
}

const MessageSection = ({ channel, serverMessages }: Props) => {
  const { supabase } = useSupabase()
  const [messages, setMessages] = useState(serverMessages)

  useEffect(() => {
    setMessages(serverMessages)
  }, [serverMessages])

  useEffect(() => {
    const channelMessages = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'channel_messages' },
        (payload) => {
          console.log('Change received!', payload)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channelMessages)
    }
  }, [supabase, setMessages, messages])

  return (
    <>
      <NewMessage channel={channel} />
      <div className="flex flex-col space-y-3">
        {messages.map((message) => (
          <MessageCard key={message.id} message={message} />
        ))}
      </div>
    </>
  )
}

export default MessageSection
