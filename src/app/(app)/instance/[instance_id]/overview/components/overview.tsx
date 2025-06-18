'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Server,
  Settings,
  Network,
  Clock,
  Cpu,
  MemoryStick,
  HardDrive,
} from 'lucide-react'
import {
  useGetInstanceMonitor,
  useSuspenseGetInstance,
} from '@/core/instance/instance.query'
import {
  InstanceStatus,
} from '@/core/instance/instance.type'

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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatMemory = (mb: number) => {
  return `${(mb / 1024).toFixed(1)} GB`
}

const formatMemoryUsage = (memoryUsageMB: number, totalMemoryMB: number) => {
  const percentage = (memoryUsageMB / totalMemoryMB) * 100
  return percentage.toFixed(1)
}

const formatDiskUsage = (diskUsageMB: number, totalStorageGB: number) => {
  const totalStorageMB = totalStorageGB * 1024
  const percentage = (diskUsageMB / totalStorageMB) * 100
  return percentage.toFixed(1)
}

export function Overview({ instanceId }: Readonly<{ instanceId: string }>) {
  const { data: instance } = useSuspenseGetInstance(instanceId)
  const { data: instanceMonitor } = useGetInstanceMonitor(instanceId)

  // Show loading state if monitor data is not available
  if (!instance || !instanceMonitor) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-2 w-full bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {instanceMonitor.cpu_usage.toFixed(1)}
              %
            </div>
            <Progress value={instanceMonitor.cpu_usage} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <MemoryStick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatMemoryUsage(instanceMonitor.ram_usage, instance.ram)}
              %
            </div>
            <Progress
              value={parseFloat(
                formatMemoryUsage(instanceMonitor.ram_usage, instance.ram),
              )}
              className="mt-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatDiskUsage(instanceMonitor.storage_usage, instance.storage)}
              %
            </div>
            <Progress
              value={parseFloat(
                formatDiskUsage(instanceMonitor.storage_usage, instance.storage),
              )}
              className="mt-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network I/O</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <div className="flex justify-between">
                <span>In:</span>
                <span className="font-medium">
                  {instanceMonitor.network_in.toFixed(1)}
                  {' '}
                  MB/s
                </span>
              </div>
              <div className="flex justify-between">
                <span>Out:</span>
                <span className="font-medium">
                  {instanceMonitor.network_out.toFixed(1)}
                  {' '}
                  MB/s
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instance Details Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="mr-2 h-5 w-5" />
              Instance Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Instance ID
                </Label>
                <p className="font-mono text-sm">{instance.id}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Status
                </Label>
                <div className="mt-1">
                  {getStatusBadge(instanceMonitor.status)}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Operating System
                </Label>
                <p>{instance.os_id}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Architecture
                </Label>
                <p>{instance.arch_id}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Region
                </Label>
                <p>{instance.region_id}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Name
                </Label>
                <p>{instance.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  CPU Cores
                </Label>
                <p className="text-lg font-semibold">{instance.cpu}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Memory
                </Label>
                <p className="text-lg font-semibold">
                  {formatMemory(instance.ram)}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Storage
                </Label>
                <p className="text-lg font-semibold">
                  {instance.storage}
                  {' '}
                  GB
                </p>
              </div>
              {/* <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Account ID
                </Label>
                <p className="font-mono text-sm">{instance.account_id}</p>
              </div> */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Network className="mr-2 h-5 w-5" />
              Network Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Network Status
                </Label>
                <p className="text-sm text-muted-foreground">
                  Network information not available in current API response
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Created
                </Label>
                <p>{formatDate(instance.created_at)}</p>
              </div>
              {/* <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </Label>
                <p>{formatDate(instance.updated_at)}</p>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
