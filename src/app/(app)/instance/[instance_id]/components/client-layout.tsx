'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Play, Square, RotateCcw, Trash2, Edit } from 'lucide-react'
import { useSuspenseGetInstance } from '@/core/instance/instance.query'
import { InstanceStatus } from '@/core/instance/instance.type'

const getStatusBadge = (status: InstanceStatus) => {
  const colors = {
    [InstanceStatus.RUNNING]: 'bg-green-100 text-green-800 hover:bg-green-100',
    [InstanceStatus.STOPPED]: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
    [InstanceStatus.PENDING]:
      'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    [InstanceStatus.ERROR]: 'bg-red-100 text-red-800 hover:bg-red-100',
    [InstanceStatus.UNKNOWN]: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  }

  const statusLabels = {
    [InstanceStatus.RUNNING]: 'Running',
    [InstanceStatus.STOPPED]: 'Stopped',
    [InstanceStatus.PENDING]: 'Pending',
    [InstanceStatus.ERROR]: 'Error',
    [InstanceStatus.UNKNOWN]: 'Unknown',
  }

  return <Badge className={colors[status]}>{statusLabels[status]}</Badge>
}

export function ClientLayout({
  instanceId,
  children,
}: Readonly<{
  instanceId: string
  children: React.ReactNode
}>) {
  const router = useRouter()
  const pathname = usePathname()

  const { data: instance } = useSuspenseGetInstance(instanceId)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Map pathname to tab value
  useEffect(() => {
    const path = pathname.split('/').pop()
    if (
      path
      && [
        'overview',
        'monitoring',
        'logs',
        'network',
        'storage',
        'security',
      ].includes(path)
    ) {
      setActiveTab(path)
    }
  }, [pathname])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/instance/${instanceId}/${value}`)
  }

  const handleInstanceAction = async (action: string) => {
    setIsLoading(true)
    // TODO: Implement actual API calls for instance actions
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const handleDeleteInstance = async () => {
    setIsLoading(true)
    // TODO: Implement actual API call for instance deletion
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/')
  }

  const handleEditInstance = async (formData: FormData) => {
    setIsLoading(true)
    // TODO: Implement actual API call for instance editing
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsEditDialogOpen(false)
    setIsLoading(false)
  }

  // Show loading state if instance data is not available
  if (!instance) {
    return (
      <div className="container mx-auto space-y-6 pb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
            <div>
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-9 w-20 bg-gray-200 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/')}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold tracking-tight">
                {`Instance ${instance.name}`}
              </h1>
              {/* Note: Status is not available in the current Instance type */}
              {/* {getStatusBadge(instance.status)} */}
            </div>
            <p className="text-muted-foreground">

              {instance.id}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          {/* Note: Status-based actions are commented out since status is not in Instance type */}
          {/* {instance.status === 'stopped' && (
            <Button
              size="sm"
              onClick={() => handleInstanceAction('start')}
              disabled={isLoading}
            >
              <Play className="mr-2 h-4 w-4" />
              Start
            </Button>
          )}
          {instance.status === 'running' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleInstanceAction('stop')}
              disabled={isLoading}
            >
              <Square className="mr-2 h-4 w-4" />
              Stop
            </Button>
          )} */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleInstanceAction('restart')}
            disabled={isLoading}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Restart
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsDeleteDialogOpen(true)}
            disabled={isLoading}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <div className="">{children}</div>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Instance</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete
              {' '}
              <strong>{instance.name}</strong>
              ?
              This action cannot be undone and will permanently remove the
              instance and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteInstance}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Instance
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Instance Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <form action={handleEditInstance}>
            <DialogHeader>
              <DialogTitle>Edit Instance</DialogTitle>
              <DialogDescription>
                Update the instance configuration.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Instance Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={instance.name}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
