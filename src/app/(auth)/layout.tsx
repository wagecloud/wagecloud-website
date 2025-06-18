'use client'

import { Toaster } from 'sonner'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (typeof window !== 'undefined') {
    const token = globalThis?.localStorage?.getItem?.('token')

    if (token?.length) {
      window.location.href = '/dashboard'
    }
  }

  return (
    <div className="w-full">
      <Toaster position="top-right" />
      {children}
    </div>
  )
}
