import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'

import SignInWithProviders from './SignInWithProviders'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function SignInDialog({ isOpen, onClose }: Props) {
  const initialFocusRef = useRef(null)

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={initialFocusRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 dark:border dark:border-gray-700 dark:bg-gray-800 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-center">
                    <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 ">
                      <Dialog.Title
                        as="h1"
                        className="mb-4 text-2xl font-bold uppercase leading-6 text-gray-900 dark:text-gray-100"
                      >
                        Sign in
                      </Dialog.Title>
                      <div className="mt-2 w-full rounded-lg sm:max-w-md md:mt-0 xl:p-0">
                        <SignInWithProviders />
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
