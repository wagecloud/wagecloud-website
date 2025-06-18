'use client'

import { useListInstances } from '@/core/instance/instance.query'
import { InstanceStatusCard } from '../../components/instance-status-card'
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'
import { Server } from 'lucide-react'

export function StatusCards() {
  const infiniteInstances = useListInstances({
    page: 1,
    limit: 10,
  })
  const {
    items: instances,
  } = useInfiniteScroll(infiniteInstances, 10)

  // const runningInstances = instances.filter(instance => instance.status === InstanceStatus.RUNNING).length
  // const stoppedInstances = instances.filter(instance => instance.status === InstanceStatus.STOPPED).length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <InstanceStatusCard
        title="Total VMs"
        value={instances.length.toString()}
        description="Total virtual machines"
        icon={<Server className="h-4 w-4 text-muted-foreground" />}
      />
      <InstanceStatusCard
        title="Running"
        // value={runningInstances.toString()}
        value="0"
        description="Active virtual machines"
        icon={<Server className="h-4 w-4 text-green-500" />}
        trend="+2"
        trendType="positive"
      />
      <InstanceStatusCard
        title="Stopped"
        // value={stoppedInstances.toString()}
        value="0"
        description="Inactive virtual machines"
        icon={<Server className="h-4 w-4 text-red-500" />}
        trend="-1"
        trendType="negative"
      />
    </div>
  )
}
