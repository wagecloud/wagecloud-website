'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Shield, Key, Eye, EyeOff } from 'lucide-react'
import { usePatchAccount } from '@/core/account/account.query'
import { toast } from 'sonner'

// Form validation schema
const passwordSchema = z
  .object({
    current_password: z.string().min(8, 'Current password is required'),
    new_password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z.string().min(8, 'Please confirm your password'),
  })
  .refine(data => data.new_password === data.confirm_password, {
    message: 'Passwords don\'t match',
    path: ['confirm_password'],
  })

type PasswordFormData = z.infer<typeof passwordSchema>

export default function SecurityPage() {
  const { mutateAsync: mutatePatchAccount } = usePatchAccount()
  const [showPassword, setShowPassword] = useState(false)

  // Password form
  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  })

  const onPasswordSubmit = async (data: PasswordFormData) => {
    if (data.new_password !== data.confirm_password) {
      passwordForm.setError('confirm_password', {
        type: 'manual',
        message: 'Passwords do not match',
      })
      return
    }

    try {
      await mutatePatchAccount({
        current_password: data.current_password,
        new_password: data.new_password,
      })

      toast.success('Password updated successfully!', {
        description: 'Your password has been changed.',
        duration: 3000,
      })

      // Handle password update
      passwordForm.reset()
    }
    catch (error: any) {
      console.error('Failed to update password:', error)
      toast.error('Failed to update password', {
        description:
          error.message || 'Please check your current password and try again.',
        duration: 5000,
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Password & Security
          </CardTitle>
          <CardDescription>
            Manage your password and security settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="current_password">Current Password</Label>
              <div className="relative">
                <Input
                  id="current_password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter current password"
                  {...passwordForm.register('current_password')}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword
                    ? (
                        <EyeOff className="h-4 w-4" />
                      )
                    : (
                        <Eye className="h-4 w-4" />
                      )}
                </Button>
              </div>
              {passwordForm.formState.errors.current_password && (
                <p className="text-sm text-destructive">
                  {passwordForm.formState.errors.current_password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="new_password">New Password</Label>
              <Input
                id="new_password"
                type="password"
                placeholder="Enter new password"
                {...passwordForm.register('new_password')}
              />
              {passwordForm.formState.errors.new_password && (
                <p className="text-sm text-destructive">
                  {passwordForm.formState.errors.new_password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm_password">Confirm New Password</Label>
              <Input
                id="confirm_password"
                type="password"
                placeholder="Confirm new password"
                {...passwordForm.register('confirm_password')}
              />
              {passwordForm.formState.errors.confirm_password && (
                <p className="text-sm text-destructive">
                  {passwordForm.formState.errors.confirm_password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={passwordForm.formState.isSubmitting}
            >
              {passwordForm.formState.isSubmitting
                ? 'Updating...'
                : 'Update Password'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS Authentication</p>
              <p className="text-sm text-muted-foreground">
                Receive codes via SMS
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Authenticator App</p>
              <p className="text-sm text-muted-foreground">
                Use an authenticator app for codes
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
