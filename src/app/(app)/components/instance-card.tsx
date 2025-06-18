import { TableCell, TableRow } from '@/components/ui/table'
import { useGetInstanceMonitor, useStartInstance, useStopInstance } from '@/core/instance/instance.query'
import {
  Play,
  Square,
  RefreshCw,
  Terminal,
  Settings,
} from 'lucide-react'
import { ButtonLoading } from '@/components/ui/button-loading'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { InstanceStatus } from '@/core/instance/instance.type'
import { getStatusBadge } from './status-badge'
import { ErrorBoundary } from 'react-error-boundary'

export function InstanceCard({
  id,
  name,
  os_id,
  arch_id,
  cpu,
  ram,
  storage,
}: Readonly<{
  id: string
  name: string
  os_id: string
  arch_id: string
  cpu: number
  ram: number
  storage: number
}>) {
  const { data: monitor } = useGetInstanceMonitor(id)
  const { mutateAsync: mutateStartVM } = useStartInstance()
  const { mutateAsync: mutateStopVM } = useStopInstance()

  return (
    <ErrorBoundary fallback={(
      <TableRow>
        <TableCell colSpan={5} className="text-center">
          Failed to load instance data adasd
        </TableCell>
      </TableRow>
    )}
    >
      <TableRow
        key={id}
        className="cursor-pointer hover:bg-muted/50"
      >
        <TableCell className="font-medium">{name}</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            {getStatusBadge(monitor?.status ?? InstanceStatus.UNKNOWN)}
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
            <ButtonLoading
              variant="outline"
              size="sm"
              onClick={async (e) => {
                e.stopPropagation()
                await mutateStartVM(id)
              }}
              className="flex items-center gap-1"
              disabled={monitor?.status === InstanceStatus.RUNNING || monitor?.status === InstanceStatus.UNKNOWN || !monitor}
            >
              <Play className="h-4 w-4" />
              Start
            </ButtonLoading>
            <ButtonLoading
              variant="outline"
              size="sm"
              onClick={async (e) => {
                e.stopPropagation()
                await mutateStopVM(id)
              }}
              className="flex items-center gap-1"
              disabled={monitor?.status !== InstanceStatus.RUNNING}
            >
              <Square className="h-4 w-4" />
              Stop
            </ButtonLoading>
            {/* <ButtonLoading
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
            </ButtonLoading> */}
            {/* {status === 'running' && (
              <ButtonLoading
                variant="default"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className="flex items-center gap-1"
              >
                <Terminal className="h-4 w-4" />
                SSH
              </ButtonLoading>
            )} */}
            <Link href={`/instance/${id}`}>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                disabled={monitor?.status === InstanceStatus.UNKNOWN || !monitor}
              >
                <Settings className="h-4 w-4" />
                Manage
                {' '}
                {monitor?.status == InstanceStatus.UNKNOWN}
              </Button>
            </Link>
          </div>
        </TableCell>
      </TableRow>
    </ErrorBoundary>
  )
}
