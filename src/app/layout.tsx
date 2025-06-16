import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Providers from './providers'

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
      className="_SD_ACTIVE_ _SD_LOADED_" // this class is added for hydration with DarkReader extension
    >
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
