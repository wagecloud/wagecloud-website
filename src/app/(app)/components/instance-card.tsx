import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { useStartInstance, useStopInstance } from '@/core/instance/instance.query'
import {
  Play,
  Square,
  RefreshCw,
  Terminal,
} from 'lucide-react'

export function InstanceCard({
  id,
  name,
  status,
  os_id,
  arch_id,
  cpu,
  ram,
  storage,
}: Readonly<{
  id: string
  name: string
  status: 'running' | 'stopped' | 'restarting'
  os_id: string
  arch_id: string
  cpu: number
  ram: number
  storage: number
}>) {
  const { mutateAsync: mutateStartVM } = useStartInstance()
  const { mutateAsync: mutateStopVM } = useStopInstance()

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

  return (
    <TableRow
      key={id}
      className="cursor-pointer hover:bg-muted/50"
    >
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${getStatusColor(status)}`}
          />
          <span className="capitalize">{status}</span>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {os_id}
        {' '}
        {arch_id}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <div className="flex flex-col gap-1 text-xs">
          <div>
            {`CPU: ${cpu} core${cpu > 1 ? 's' : ''}`}
          </div>
          <div>
            {`RAM: ${ram} GB`}
          </div>
          <div>
            {`Storage: ${storage} GB`}
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          {status !== 'running' && (
            <Button
              variant="outline"
              size="sm"
              onClick={async (e) => {
                e.stopPropagation()
                mutateStartVM(id)
              }}
              className="flex items-center gap-1"
            >
              <Play className="h-4 w-4" />
              Start
            </Button>
          )}
          {status !== 'stopped' && (
            <Button
              variant="outline"
              size="sm"
              onClick={async (e) => {
                e.stopPropagation()
                mutateStopVM(id)
              }}
              className="flex items-center gap-1"
            >
              <Square className="h-4 w-4" />
              Stop
            </Button>
          )}
          {status !== 'restarting' && (
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
          {status === 'running' && (
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
  )
}
