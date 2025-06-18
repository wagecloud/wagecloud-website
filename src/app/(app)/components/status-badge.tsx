import { Badge } from '@/components/ui/badge'
import { InstanceStatus } from '@/core/instance/instance.type'

export const getStatusBadge = (status: InstanceStatus) => {
  const colors: Record<InstanceStatus, string> = {
    [InstanceStatus.UNKNOWN]: '',
    [InstanceStatus.RUNNING]: 'bg-green-100 text-green-800 hover:bg-green-100',
    [InstanceStatus.STOPPED]: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
    [InstanceStatus.PENDING]: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    [InstanceStatus.ERROR]: 'bg-red-100 text-red-800 hover:bg-red-100',
  }

  return (
    <Badge className={colors[status]}>
      {
        status.replace('STATUS_', '').replace('_', ' ')
      }
    </Badge>
  )
}
