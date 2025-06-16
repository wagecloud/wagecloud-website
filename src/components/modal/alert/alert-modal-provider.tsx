'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { AlertModal, type AlertType } from '@/components/ui/alert-modal'

interface AlertOptions {
  title: string
  description?: string
  type?: AlertType
  primaryAction?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  content?: ReactNode
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void
  closeAlert: () => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export function AlertModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<AlertOptions | null>(null)

  const showAlert = (alertOptions: AlertOptions) => {
    setOptions(alertOptions)
    setIsOpen(true)
  }

  const closeAlert = () => {
    setIsOpen(false)
  }

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}
      {options && (
        <AlertModal
          isOpen={isOpen}
          onClose={closeAlert}
          title={options.title}
          description={options.description}
          type={options.type}
          primaryAction={options.primaryAction}
          secondaryAction={options.secondaryAction}
        >
          {options.content}
        </AlertModal>
      )}
    </AlertContext.Provider>
  )
}

export const useAlert = () => {
  const context = useContext(AlertContext)
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertModalProvider')
  }
  return context
}
