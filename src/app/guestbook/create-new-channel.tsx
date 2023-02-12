'use client'
import cn from 'classnames'
import { useLoginDialog } from 'components/providers/login-dialog-provider'
import { useSupabase } from 'components/providers/supabase-provider'
import { useToast } from 'components/providers/toast-provider'
import { useState } from 'react'
import slugify from 'slugify'

const CreateNewChannel = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { supabase, session } = useSupabase()
  const { open } = useLoginDialog()
  const { onOpenChange, setToast } = useToast()

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      if (!session) {
        setToast({
          title: 'You need to be logged in to create a channel',
          description: 'Please login or signup to continue',
          status: 'error',
          isOpen: true,
          duration: 5000,
          onActionClick: () => {
            open()
            onOpenChange(false)
          },
          onOpenChange,
          actionLabel: 'Login',
        })

        return
      }

      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', session?.user?.id)
        .eq('role', 'admin')

      if (error) throw error

      if (!data || data.length === 0) {
        setToast({
          title: 'You need to be an admin to create a channel',
          description: 'Please ask an admin to create a channel for you',
          status: 'error',
          isOpen: true,
          duration: 5000,
          onActionClick: () => {
            onOpenChange(false)
          },
          onOpenChange,
          actionLabel: 'Ok',
        })
        return
      }

      const { error: error2 } = await supabase.from('channels').insert([
        {
          name: 'General',
          description: 'General discussion about the project',
          slug: slugify('General', { lower: true }),
          created_by: session?.user?.id,
        },
      ])
      if (error2) throw error2

      setToast({
        title: 'Channel created successfully',
        description: 'You can now start chatting',
        status: 'success',
        isOpen: true,
        duration: 5000,
        onActionClick: () => {
          onOpenChange(false)
        },
        onOpenChange,
        actionLabel: 'Ok',
      })
    } catch (err) {
      console.log('error', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-4 flex flex-col items-center justify-between">
      <button
        type="button"
        className={cn(
          'inline-flex w-full max-w-md items-center justify-center rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow transition duration-150  ease-in-out hover:bg-gray-500',
          {
            'cursor-not-allowed opacity-50': isSubmitting,
          }
        )}
        onClick={handleSubmit}
      >
        {isSubmitting && (
          <svg
            className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
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
        {isSubmitting ? 'Loading...' : 'Create New Channel'}
      </button>
    </div>
  )
}

export default CreateNewChannel
