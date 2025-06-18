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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Save, Mail, Phone, MapPin, Building } from 'lucide-react'
import { useGetUser, usePatchUser } from '@/core/account/account.query'
import { toast } from 'sonner'
import { useEffect } from 'react'

// Form validation schema
const profileSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address').optional().nullable(),
  phone: z.string().min(1, 'Phone number is required').optional().nullable(),
  company: z.string().min(1, 'Company name is required').optional().nullable(),
  address: z.string().min(1, 'Address is required').optional().nullable(),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const { data: user } = useGetUser()
  const { mutateAsync: mutatePatchUser } = usePatchUser()

  // Profile form
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      phone: user?.phone,
      company: user?.company,
      address: user?.address,
    },
  })

  useEffect(() => {
    // Reset form values when user data changes
    if (user) {
      profileForm.reset({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email ?? '',
        phone: user.phone ?? '',
        company: user.company ?? '',
        address: user.address ?? '',
      })
    }
  }, [user])

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          Loading user profile...
        </p>
      </div>
    )
  }

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      await mutatePatchUser({
        address: data.address ?? undefined,
        company: data.company ?? undefined,
        email: data.email ?? undefined,
        first_name: data.first_name,
        last_name: data.last_name,
      })

      toast.success('Profile updated successfully!', {
        description: 'Your profile information has been saved.',
        duration: 3000,
      })
    }
    catch (error: any) {
      console.error('Failed to update profile:', error)
      toast.error('Failed to update profile', {
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
            <Save className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Update your personal information and contact details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  {...profileForm.register('first_name')}
                />
                {profileForm.formState.errors.first_name && (
                  <p className="text-sm text-destructive">
                    {profileForm.formState.errors.first_name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" {...profileForm.register('last_name')} />
                {profileForm.formState.errors.last_name && (
                  <p className="text-sm text-destructive">
                    {profileForm.formState.errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                {...profileForm.register('email')}
              />
              {profileForm.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {profileForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input id="phone" {...profileForm.register('phone')} />
              {profileForm.formState.errors.phone && (
                <p className="text-sm text-destructive">
                  {profileForm.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Company
              </Label>
              <Input id="company" {...profileForm.register('company')} />
              {profileForm.formState.errors.company && (
                <p className="text-sm text-destructive">
                  {profileForm.formState.errors.company.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <Textarea
                id="address"
                {...profileForm.register('address')}
                rows={3}
              />
              {profileForm.formState.errors.address && (
                <p className="text-sm text-destructive">
                  {profileForm.formState.errors.address.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={profileForm.formState.isSubmitting}
              className="w-full sm:w-auto"
            >
              <Save className="mr-2 h-4 w-4" />
              {profileForm.formState.isSubmitting
                ? 'Saving...'
                : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
