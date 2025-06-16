'use client'

import type { ReactNode } from 'react'
import { AlertCircle, CheckCircle2, Info, X, AlertTriangle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type AlertType = 'success' | 'error' | 'warning' | 'info'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
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
  children?: ReactNode
}

export function AlertModal({
  isOpen,
  onClose,
  title,
  description,
  type = 'info',
  primaryAction,
  secondaryAction,
  children,
}: AlertModalProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-6 w-6 text-green-500" />
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-amber-500" />
      case 'info':
      default:
        return <Info className="h-6 w-6 text-blue-500" />
    }
  }

  const getHeaderClass = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-950/30'
      case 'error':
        return 'bg-red-50 dark:bg-red-950/30'
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-950/30'
      case 'info':
      default:
        return 'bg-blue-50 dark:bg-blue-950/30'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader
          className={cn(
            'p-6 rounded-t-lg flex flex-row gap-4 items-start',
            getHeaderClass(),
          )}
        >
          {getIcon()}
          <div className="flex-1">
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription className="mt-1">
                {description}
              </DialogDescription>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full"
            onClick={onClose}
          >
            {/* <X className="h-4 w-4" /> */}
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        {children && <div className="p-6">{children}</div>}

        {(primaryAction || secondaryAction) && (
          <DialogFooter className="sm:justify-end gap-2 p-6 pt-0">
            {secondaryAction && (
              <Button variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button
                onClick={primaryAction.onClick}
                variant={type === 'error' ? 'destructive' : 'default'}
              >
                {primaryAction.label}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
