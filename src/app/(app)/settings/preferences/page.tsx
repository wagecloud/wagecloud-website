'use client'

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
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Globe, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

// Form validation schema
const preferencesSchema = z.object({
  timezone: z.string().min(1, 'Please select a timezone'),
  language: z.string().min(1, 'Please select a language'),
})

type PreferencesFormData = z.infer<typeof preferencesSchema>

export default function PreferencesPage() {
  // Preferences form
  const preferencesForm = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      timezone: '',
      language: '',
    },
  })

  const onPreferencesSubmit = async (data: PreferencesFormData) => {
    try {
      // Handle preferences update - you'll need to implement this API call
      console.log('Preferences data:', data)

      toast.success('Preferences saved successfully!', {
        description: 'Your preferences have been updated.',
        duration: 3000,
      })
    }
    catch (error: any) {
      console.error('Failed to save preferences:', error)
      toast.error('Failed to save preferences', {
        description: error.message || 'Please try again later.',
        duration: 5000,
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            General Preferences
          </CardTitle>
          <CardDescription>
            Customize your experience and interface preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Use dark theme for the interface
                  </p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  onValueChange={value =>
                    preferencesForm.setValue('timezone', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time</SelectItem>
                    <SelectItem value="pst">Pacific Time</SelectItem>
                    <SelectItem value="cst">Central Time</SelectItem>
                  </SelectContent>
                </Select>
                {preferencesForm.formState.errors.timezone && (
                  <p className="text-sm text-destructive">
                    {preferencesForm.formState.errors.timezone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  onValueChange={value =>
                    preferencesForm.setValue('language', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
                {preferencesForm.formState.errors.language && (
                  <p className="text-sm text-destructive">
                    {preferencesForm.formState.errors.language.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={preferencesForm.formState.isSubmitting}
            >
              {preferencesForm.formState.isSubmitting
                ? 'Saving...'
                : 'Save Preferences'}
            </Button>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium text-destructive">Danger Zone</h4>
              <div className="p-4 border border-destructive/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Delete Account</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
