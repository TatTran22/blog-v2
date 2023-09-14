import * as ToastPrimitive from '@radix-ui/react-toast'
import cn from 'classnames'
import { useMediaQuery } from 'hooks/use-media-query'
import React from 'react'

export type ToastProps = {
  title: string
  description: React.ReactNode
  status: 'success' | 'error' | 'warning' | 'info'
  isOpen: boolean
  duration?: number
  onOpenChange: (open: boolean) => void
  onActionClick?: () => void
  actionLabel?: string
}

const Toast = (props: ToastProps) => {
  const {
    title,
    description,
    status,
    isOpen,
    duration = 5000,
    onOpenChange,
    onActionClick,
    actionLabel,
  } = props
  const isMd = useMediaQuery('(min-width: 768px)')

  return (
    <ToastPrimitive.Provider swipeDirection={isMd ? 'right' : 'down'} duration={duration}>
      <ToastPrimitive.Root
        open={isOpen}
        onOpenChange={onOpenChange}
        className={cn(
          'fixed inset-x-4 bottom-4 z-50 w-auto rounded-lg shadow-lg md:top-4 md:right-4 md:left-auto md:bottom-auto md:w-full md:max-w-sm',
          'bg-white dark:bg-gray-800',
          'radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right',
          'radix-state-closed:animate-toast-hide',
          'radix-swipe-direction-right:radix-swipe-end:animate-toast-swipe-out-x',
          'radix-swipe-direction-right:translate-x-radix-toast-swipe-move-x',
          'radix-swipe-direction-down:radix-swipe-end:animate-toast-swipe-out-y',
          'radix-swipe-direction-down:translate-y-radix-toast-swipe-move-y',
          'radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]',
          'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
        )}
      >
        <div
          className={cn('flex items-center justify-between', {
            'border-b border-gray-200 dark:border-gray-700': status === 'info',
            'border-b border-green-200 dark:border-green-700': status === 'success',
            'border-b border-red-200 dark:border-red-700': status === 'error',
            'border-b border-yellow-200 dark:border-yellow-700': status === 'warning',
          })}
        >
          <div className="flex w-0 flex-1 items-center py-4 pl-5">
            <div className="radix w-full">
              <ToastPrimitive.Title
                className={cn('font-medium', 'text-gray-900 dark:text-gray-100', {
                  'text-green-600 dark:text-green-400': status === 'success',
                  'text-red-600 dark:text-red-400': status === 'error',
                  'text-yellow-600 dark:text-yellow-400': status === 'warning',
                  'text-blue-600 dark:text-blue-400': status === 'info',
                })}
              >
                {title}
              </ToastPrimitive.Title>
              <ToastPrimitive.Description className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                {description}
              </ToastPrimitive.Description>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col space-y-1 px-3 py-2">
              <div className="flex h-0 flex-1">
                {actionLabel && (
                  <ToastPrimitive.Action
                    altText="view now"
                    className="flex w-full items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-purple-600 hover:bg-gray-50 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 dark:text-purple-500 dark:hover:bg-gray-900"
                    onClick={(e) => {
                      e.preventDefault()
                      onActionClick?.()
                    }}
                  >
                    {actionLabel}
                  </ToastPrimitive.Action>
                )}
              </div>
              <div className="flex h-0 flex-1">
                <ToastPrimitive.Close className="flex w-full items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 dark:text-gray-100 dark:hover:bg-gray-900">
                  Dismiss
                </ToastPrimitive.Close>
              </div>
            </div>
          </div>
        </div>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  )
}

export { Toast }
