'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Play,
  Square,
  RefreshCw,
  Terminal,
  PlusCircle,
  Search,
  Server,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { InstanceStatusCard } from '@/app/(app)/components/instance-status-card'
import { useListVM, useStartVM, useStopVM } from '@/core/vm/vm.query'

export default function MachinesPage() {
  const { data: vms = [] } = useListVM({
    page: 1,
    limit: 10,
  })
  const [searchTerm, setSearchTerm] = useState('')
  const { mutateAsync: mutateStartVM } = useStartVM()
  const { mutateAsync: mutateStopVM } = useStopVM()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-500'
      case 'stopped':
        return 'bg-red-500'
      case 'restarting':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  const filteredVMs = vms.filter(
    vm =>
      vm.name.toLowerCase().includes(searchTerm.toLowerCase())
      || vm.os.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const runningVMs = vms.filter(vm => vm.status === 'running').length
  const stoppedVMs = vms.filter(vm => vm.status === 'stopped').length
  const restartingVMs = vms.filter(vm => vm.status === 'restarting').length

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <InstanceStatusCard
          title="Total VMs"
          value={vms.length.toString()}
          description="Total virtual machines"
          icon={<Server className="h-4 w-4 text-muted-foreground" />}
        />
        <InstanceStatusCard
          title="Running"
          value={runningVMs.toString()}
          description="Active virtual machines"
          icon={<Server className="h-4 w-4 text-green-500" />}
          trend="+2"
          trendType="positive"
        />
        <InstanceStatusCard
          title="Stopped"
          value={stoppedVMs.toString()}
          description="Inactive virtual machines"
          icon={<Server className="h-4 w-4 text-red-500" />}
          trend="-1"
          trendType="negative"
        />
        <InstanceStatusCard
          title="Restarting"
          value={restartingVMs.toString()}
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
                placeholder="Search VMs..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              New VM
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
                {filteredVMs.map(vm => (
                  <TableRow
                    key={vm.id}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell className="font-medium">{vm.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${getStatusColor(
                            vm.status,
                          )}`}
                        />
                        <span className="capitalize">{vm.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {vm.os}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex flex-col gap-1 text-xs">
                        <div>
                          CPU:
                          {vm.cpu}
                          {' '}
                          cores
                        </div>
                        <div>
                          RAM:
                          {Math.floor(vm.ram / 1024)}
                          {' '}
                          GB
                        </div>
                        <div>
                          Storage:
                          {vm.storage}
                          {' '}
                          GB
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {vm.status !== 'running' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={async (e) => {
                              e.stopPropagation()
                              mutateStartVM(vm.id)
                            }}
                            className="flex items-center gap-1"
                          >
                            <Play className="h-4 w-4" />
                            Start
                          </Button>
                        )}
                        {vm.status !== 'stopped' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={async (e) => {
                              e.stopPropagation()
                              mutateStopVM(vm.id)
                            }}
                            className="flex items-center gap-1"
                          >
                            <Square className="h-4 w-4" />
                            Stop
                          </Button>
                        )}
                        {vm.status !== 'restarting' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                            }}
                            className="flex items-center gap-1"
                            disabled
                          >
                            <RefreshCw className="h-4 w-4" />
                            Restart
                          </Button>
                        )}
                        {vm.status === 'running' && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                            }}
                            className="flex items-center gap-1"
                          >
                            <Terminal className="h-4 w-4" />
                            SSH
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
