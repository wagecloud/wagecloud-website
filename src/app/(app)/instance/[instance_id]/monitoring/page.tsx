'use client'

import { useParams } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Activity, RefreshCw } from 'lucide-react'
import {
  useGetInstanceMonitor,
  useSuspenseGetInstance,
} from '@/core/instance/instance.query'

const formatMemoryUsage = (memoryUsageMB: number, totalMemoryMB: number) => {
  const percentage = (memoryUsageMB / totalMemoryMB) * 100
  return percentage.toFixed(1)
}

const formatDiskUsage = (diskUsageMB: number, totalStorageGB: number) => {
  const totalStorageMB = totalStorageGB * 1024
  const percentage = (diskUsageMB / totalStorageMB) * 100
  return percentage.toFixed(1)
}

export default function MonitoringPage() {
  const params = useParams()
  const instanceId = params.instance_id as string

  const { data: instance } = useSuspenseGetInstance(instanceId)
  const { data: instanceMonitor, refetch } = useGetInstanceMonitor(instanceId)

  const handleRefresh = () => {
    refetch()
  }

  // Show loading state if monitor data is not available
  if (!instance || !instanceMonitor) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Real-time Monitoring
              </div>
              <Button variant="outline" size="sm" disabled>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </CardTitle>
            <CardDescription>
              Live performance metrics for your instance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Real-time Monitoring
            </div>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </CardTitle>
          <CardDescription>
            Live performance metrics for your instance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>CPU Usage</Label>
                <span className="text-sm font-medium">
                  {instanceMonitor.cpu_usage.toFixed(1)}
                  %
                </span>
              </div>
              <Progress value={instanceMonitor.cpu_usage} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Memory Usage</Label>
                <span className="text-sm font-medium">
                  {formatMemoryUsage(instanceMonitor.ram_usage, instance.ram)}
                  %
                </span>
              </div>
              <Progress
                value={parseFloat(
                  formatMemoryUsage(instanceMonitor.ram_usage, instance.ram),
                )}
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Disk Usage</Label>
                <span className="text-sm font-medium">
                  {formatDiskUsage(
                    instanceMonitor.storage_usage,
                    instance.storage,
                  )}
                  %
                </span>
              </div>
              <Progress
                value={parseFloat(
                  formatDiskUsage(
                    instanceMonitor.storage_usage,
                    instance.storage,
                  ),
                )}
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <Label>Network Traffic</Label>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Inbound:</span>
                  <span className="font-medium">
                    {instanceMonitor.network_in.toFixed(2)}
                    {' '}
                    MB/s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Outbound:</span>
                  <span className="font-medium">
                    {instanceMonitor.network_out.toFixed(2)}
                    {' '}
                    MB/s
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
