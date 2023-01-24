import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'

import SignInWithEmailForm from './SignInWithEmailForm'
import SignInWithProviders from './SignInWithProviders'

export default function SignInDialog({ isOpen, onClose }) {
  const initialFocusRef = useRef(null)

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={initialFocusRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-center">
                    <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 ">
                      <Dialog.Title
                        as="h1"
                        className="mb-4 text-2xl font-bold leading-6 text-gray-900"
                      >
                        Sign in to your account
                      </Dialog.Title>
                      <div className="w-full mt-2 bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                          <SignInWithEmailForm ref={initialFocusRef} />
                        </div>
                        <div className="flex items-center justify-center p-2 space-x-4 md:space-x-6">
                          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                          <div className="w-full text-xs text-gray-500 uppercase dark:text-gray-400">
                            or continue with
                          </div>
                          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                        </div>
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
