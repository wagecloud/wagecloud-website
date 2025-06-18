'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')

  // Map pathname to tab value
  useEffect(() => {
    const path = pathname.split('/').pop()
    if (
      path
      && [
        'profile',
        'security',
        'notifications',
        'billing',
        'preferences',
      ].includes(path)
    ) {
      setActiveTab(path)
    }
  }, [pathname])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/settings/${value}`)
  }

  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6 pb-12"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <div>{children}</div>
      </Tabs>
    </div>
  )
}
