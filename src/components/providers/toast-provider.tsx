/* eslint-disable @typescript-eslint/no-empty-function */
'use client'

import type { ToastProps } from 'components/Toast'
import { Toast } from 'components/Toast'
import React, { useContext, useEffect, useState } from 'react'

type ToastContext = Omit<ToastProps, 'onOpenChange'> & {
  onOpenChange: (open: boolean) => void
  setToast: (toast: ToastProps) => void
}

const ToastContext = React.createContext<ToastContext | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastProps>({
    title: '',
    description: '',
    status: 'info',
    isOpen: false,
    duration: 3000,
    onOpenChange: () => {},
    onActionClick: () => {},
    actionLabel: '',
  })

  const onOpenChange = (open: boolean) => {
    setToast((toast) => ({ ...toast, isOpen: open }))
  }

  return (
    <ToastContext.Provider value={{ ...toast, onOpenChange, setToast }}>
      {children}
      <Toast {...toast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const toast = useContext(ToastContext)
  if (!toast) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return toast
}

export default ToastProvider
