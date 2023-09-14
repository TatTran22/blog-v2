'use client'

import { useLoginDialog } from 'components/providers/login-dialog-provider'
import { useSupabase } from 'components/providers/supabase-provider'
import { useToast } from 'components/providers/toast-provider'
import { Database } from 'lib/types'
import { useState } from 'react'

interface NewMessageProps {
  channel: Database['public']['Tables']['channels']['Row']
}

export default function NewMessage(props: NewMessageProps) {
  const { channel } = props
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { open } = useLoginDialog()
  const { supabase, session } = useSupabase()
  const { setToast, onOpenChange } = useToast()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault()

      setIsSubmitting(true)
      if (!session) {
        throw new Error('You must be logged in to send a message', {
          cause: 'unauthenticated',
        })
      }

      if (!message) {
        throw new Error('Message cannot be empty', { cause: 'empty' })
      }

      const { error } = await supabase.from('channel_messages').insert({
        content: message,
        sender_id: session?.user?.id,
        channel_id: channel.id,
      })
      if (error) throw error

      setMessage('')
    } catch (err) {
      console.log(err)
      let title = 'Something went wrong'
      let actionLabel = ''
      switch (err.cause) {
        case 'unauthenticated':
          title = 'Login required'
          actionLabel = 'Login'
          break
        case 'empty':
          title = 'Message cannot be empty'
          break
      }

      setToast({
        title: title,
        description: err.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isOpen: true,
        onOpenChange,
        onActionClick: err.cause
          ? () => {
              open()
              onOpenChange(false)
            }
          : undefined,
        actionLabel,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="message"
          className="text-md sr-only mb-2 font-medium text-gray-900 dark:text-white"
        >
          Message
        </label>
        <div className="relative">
          <input
            id="message"
            className="text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Type your message"
            type="text"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete="off"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="text-md absolute bottom-2.5 right-2.5 inline-flex items-center justify-center rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow transition duration-150 ease-in-out hover:bg-gray-500"
          >
            {isSubmitting && (
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  )
}
