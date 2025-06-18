'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { HardDrive, Plus, Trash2 } from 'lucide-react'
import {
  useGetInstanceMonitor,
  useSuspenseGetInstance,
} from '@/core/instance/instance.query'

const formatDiskUsage = (diskUsageMB: number, totalStorageGB: number) => {
  const totalStorageMB = totalStorageGB * 1024
  const percentage = (diskUsageMB / totalStorageMB) * 100
  return percentage.toFixed(1)
}

export function StorageComponent({
  instanceId,
}: Readonly<{ instanceId: string }>) {
  const { data: instance } = useSuspenseGetInstance(instanceId)
  const { data: instanceMonitor } = useGetInstanceMonitor(instanceId)

  // Show loading state if data is not available
  if (!instance || !instanceMonitor) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <HardDrive className="mr-2 h-5 w-5" />
                Storage Management
              </div>
              <Button size="sm" disabled>
                <Plus className="mr-2 h-4 w-4" />
                Add Volume
              </Button>
            </CardTitle>
            <CardDescription>
              Manage storage volumes and disk usage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="text-right">
                  <div className="h-5 w-16 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const diskUsagePercentage = parseFloat(
    formatDiskUsage(instanceMonitor.storage_usage, instance.storage),
  )
  const usedStorage = Math.round(
    (instance.storage * diskUsagePercentage) / 100,
  )
  const freeStorage = instance.storage - usedStorage

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <HardDrive className="mr-2 h-5 w-5" />
              Storage Management
            </div>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Volume
            </Button>
          </CardTitle>
          <CardDescription>
            Manage storage volumes and disk usage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Root Volume</h4>
                <p className="text-sm text-muted-foreground">
                  Primary storage device
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {instance.storage}
                  {' '}
                  GB
                </p>
                <p className="text-sm text-muted-foreground">SSD</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Disk Usage</Label>
                <span className="text-sm font-medium">
                  {formatDiskUsage(
                    instanceMonitor.storage_usage,
                    instance.storage,
                  )}
                  % used
                </span>
              </div>
              <Progress value={diskUsagePercentage} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  Used:
                  {usedStorage}
                  {' '}
                  GB
                </span>
                <span>
                  Free:
                  {freeStorage}
                  {' '}
                  GB
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Additional Volumes</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Data Volume</p>
                  <p className="text-sm text-muted-foreground">
                    Secondary storage for data
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">50 GB</span>
                  <Badge variant="outline">Attached</Badge>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Backup Volume</p>
                  <p className="text-sm text-muted-foreground">
                    Backup storage
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">200 GB</span>
                  <Badge variant="outline">Attached</Badge>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Storage Performance</h4>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-3 border rounded-lg">
                <p className="text-sm text-muted-foreground">Read IOPS</p>
                <p className="text-lg font-semibold">3,200</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-sm text-muted-foreground">Write IOPS</p>
                <p className="text-lg font-semibold">1,600</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-sm text-muted-foreground">Throughput</p>
                <p className="text-lg font-semibold">125 MB/s</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
