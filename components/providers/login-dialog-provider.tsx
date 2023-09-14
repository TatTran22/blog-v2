/* eslint-disable @typescript-eslint/no-empty-function */
'use client'

import SignInDialog from 'components/SignInDialog'
import { createContext, useContext, useState } from 'react'

type LoginDialogContext = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const LoginDialogContext = createContext<LoginDialogContext>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export function LoginDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <LoginDialogContext.Provider value={{ isOpen, open, close }}>
      <SignInDialog isOpen={isOpen} onClose={close} />
      {children}
    </LoginDialogContext.Provider>
  )
}

export function useLoginDialog() {
  return useContext(LoginDialogContext)
}
