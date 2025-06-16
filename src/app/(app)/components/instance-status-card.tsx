import type React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Server } from 'lucide-react'

interface InstanceStatusCardProps {
  title: string
  value: string
  description: string
  icon?: React.ReactNode
  trend?: string
  trendType?: 'positive' | 'negative' | 'warning' | 'neutral'
}

export function InstanceStatusCard({
  title,
  value,
  description,
  icon,
  trend,
  trendType = 'neutral',
}: Readonly<InstanceStatusCardProps>) {
  const getTrendColor = () => {
    switch (trendType) {
      case 'positive':
        return 'text-green-600'
      case 'negative':
        return 'text-red-600'
      case 'warning':
        return 'text-yellow-600'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon || <Server className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription>{description}</CardDescription>
        {trend && (
          <p className={cn('text-xs mt-1', getTrendColor())}>{trend}</p>
        )}
      </CardContent>
    </Card>
  )
}
