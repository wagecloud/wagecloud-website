'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  PlusCircle,
  Search,
  Server,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { InstanceStatusCard } from '@/app/(app)/components/instance-status-card'
import { useListInstances } from '@/core/instance/instance.query'
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'
import { InstanceCard } from '../components/instance-card'
import { InstanceStatus } from '@/core/instance/instance.type'

export default function MachinesPage() {
  const [search, setSearch] = useState('')
  const infiniteInstances = useListInstances({
    page: 1,
    limit: 10,
    name: search.length > 0 ? search : undefined,
  })

  const {
    ref: refTriggerScroll,
    items: instances,
  } = useInfiniteScroll(infiniteInstances, 10)

  const runningInstances = instances.filter(instance => instance.status === InstanceStatus.RUNNING).length
  const stoppedInstances = instances.filter(instance => instance.status === InstanceStatus.STOPPED).length
  const restartingInstances = instances.filter(instance => instance.status === InstanceStatus.RESTARTING).length

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <InstanceStatusCard
          title="Total VMs"
          value={instances.length.toString()}
          description="Total virtual machines"
          icon={<Server className="h-4 w-4 text-muted-foreground" />}
        />
        <InstanceStatusCard
          title="Running"
          value={runningInstances.toString()}
          description="Active virtual machines"
          icon={<Server className="h-4 w-4 text-green-500" />}
          trend="+2"
          trendType="positive"
        />
        <InstanceStatusCard
          title="Stopped"
          value={stoppedInstances.toString()}
          description="Inactive virtual machines"
          icon={<Server className="h-4 w-4 text-red-500" />}
          trend="-1"
          trendType="negative"
        />
        <InstanceStatusCard
          title="Restarting"
          value={restartingInstances.toString()}
          description="VMs in transition"
          icon={<Server className="h-4 w-4 text-yellow-500" />}
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Virtual Machines</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search instances..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              New Instance
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Operating System
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Resources
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instances.map(instance => (
                  <InstanceCard
                    key={instance.id}
                    id={instance.id}
                    name={instance.name}
                    status={instance.status}
                    os_id={instance.os_id}
                    arch_id={instance.arch_id}
                    cpu={instance.cpu}
                    ram={instance.ram}
                    storage={instance.storage}
                  >
                  </InstanceCard>
                ))}
                <TableRow ref={refTriggerScroll} />
              </TableBody>

            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
