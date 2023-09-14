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
  const { supabase, profiles } = useSupabase()
  const [messages, setMessages] = useState(serverMessages)
  const [sortedMessages, setSortedMessages] = useState<Message[]>([])
  const [sorted, setSorted] = useState(false)

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
          const { new: newMessage } = payload

          setMessages((messages) => [
            ...messages,
            {
              ...newMessage,
              users: profiles.find((profile) => profile.id === newMessage.sender_id),
            } as Message,
          ])

          setSorted(false)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channelMessages)
    }
  }, [supabase, setMessages, messages, profiles])

  useEffect(() => {
    if (!sorted) {
      setSortedMessages(
        messages.sort((a, b) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        })
      )
      setSorted(true)
    }
  }, [messages, sorted])

  return (
    <>
      <NewMessage channel={channel} />
      <div className="flex flex-col space-y-3">
        {sortedMessages.map((message) => (
          <MessageCard key={message.id} message={message} />
        ))}
      </div>
    </>
  )
}

export default MessageSection
