'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Bell } from 'lucide-react'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    vmAlerts: true,
    billing: true,
    security: true,
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose how you want to be notified about important events
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Notification Methods</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={value =>
                    handleNotificationChange('email', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive browser push notifications
                  </p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={value =>
                    handleNotificationChange('push', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via SMS
                  </p>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={value =>
                    handleNotificationChange('sms', value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Notification Types</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Instance Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Status changes, performance alerts
                  </p>
                </div>
                <Switch
                  checked={notifications.vmAlerts}
                  onCheckedChange={value =>
                    handleNotificationChange('vmAlerts', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Billing Updates</p>
                  <p className="text-sm text-muted-foreground">
                    Payment confirmations, invoice updates
                  </p>
                </div>
                <Switch
                  checked={notifications.billing}
                  onCheckedChange={value =>
                    handleNotificationChange('billing', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Security Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Login attempts, security changes
                  </p>
                </div>
                <Switch
                  checked={notifications.security}
                  onCheckedChange={value =>
                    handleNotificationChange('security', value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
