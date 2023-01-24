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

const SignInWithEmailForm = forwardRef<HTMLDivElement, any>(
  function SignInWithEmailForm(props, ref) {
    const { supabase, session } = useSupabase()
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isSubmitting },
    } = useForm<SignInEmailFormProps>()

    const handleEmailLogin: SubmitHandler<SignInEmailFormProps> = async (
      params
    ) => {
      console.log(params)
      const { error } = await supabase.auth.signInWithPassword(params)

      if (error) {
        console.log({ error })
      }
    }

    return (
      <form
        className="space-y-4 md:space-y-6 text-start"
        onSubmit={handleSubmit(handleEmailLogin)}
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
              'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
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
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
              'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
              {
                'border-red-500': errors.password,
              }
            )}
            autoComplete="current-password"
            disabled={isSubmitting}
          />
        </div>
        <div className="flex flex-col items-center justify-between mt-4">
          <button
            type="submit"
            className={cn(
              'w-full inline-flex items-center justify-center px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out rounded-md shadow  bg-primary-500 hover:bg-primary-400',
              {
                'opacity-50 cursor-not-allowed': isSubmitting,
              }
            )}
          >
            {isSubmitting && (
              <svg
                className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
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
  }
)

export default SignInWithEmailForm
