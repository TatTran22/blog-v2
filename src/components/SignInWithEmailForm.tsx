'use client'
import { Dialog, Transition } from '@headlessui/react'
import cn from 'classnames'
import { forwardRef, Fragment, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useSupabase } from './providers/supabase-provider'

interface SignInEmailFormProps {
  email: string
  password: string
}

const SignInWithEmailForm = forwardRef<HTMLDivElement, any>(function SignInWithEmailForm(
  props,
  ref
) {
  const { supabase, session } = useSupabase()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignInEmailFormProps>()

  const handleEmailLogin: SubmitHandler<SignInEmailFormProps> = async (params) => {
    console.log(params)
    const { error } = await supabase.auth.signInWithPassword(params)

    if (error) {
      console.log({ error })
    }
  }

  return (
    <form className="space-y-4 text-start md:space-y-6" onSubmit={handleSubmit(handleEmailLogin)}>
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          ref={ref}
          {...register('email', {
            required: 'Email is required',
          })}
          className={cn(
            'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 caret-primary-600 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm',
            {
              'border-red-500': errors.email,
            }
          )}
          disabled={isSubmitting}
          autoComplete="email"
          placeholder="name@company.com"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          {...register('password', {
            required: 'Password is required',
          })}
          className={cn(
            'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 caret-primary-600 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm',
            {
              'border-red-500': errors.password,
            }
          )}
          autoComplete="current-password"
          disabled={isSubmitting}
        />
      </div>
      <div className="mt-4 flex flex-col items-center justify-between">
        <button
          type="submit"
          className={cn(
            'inline-flex w-full items-center justify-center rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow transition duration-150  ease-in-out hover:bg-primary-400',
            {
              'cursor-not-allowed opacity-50': isSubmitting,
            }
          )}
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
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  )
})

export default SignInWithEmailForm
