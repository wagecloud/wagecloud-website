import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Providers from './providers'
import { cn } from '@/lib/utils'
import { ErrorBoundary } from 'react-error-boundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WageCloud',
  description: 'A platform for managing virtual machines',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        '_SD_ACTIVE_ _SD_LOADED_ _SD_LOADED_FULL_', // this class is added for hydration with DarkReader extension
        // ' overflow-scroll',
      )}
    >
      <body className={inter.className}>
        {/* <Providers>{children}</Providers> */}
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Providers>
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
