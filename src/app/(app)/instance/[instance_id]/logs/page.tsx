'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Terminal, Download, RefreshCw } from 'lucide-react'

type LogEntry = {
  timestamp: string
  level: 'info' | 'warning' | 'error'
  message: string
}

const mockLogs: LogEntry[] = [
  {
    timestamp: '2024-01-17T14:30:25Z',
    level: 'info',
    message: 'Instance started successfully',
  },
  {
    timestamp: '2024-01-17T14:28:15Z',
    level: 'info',
    message: 'Initializing system services',
  },
  {
    timestamp: '2024-01-17T14:25:10Z',
    level: 'warning',
    message: 'High memory usage detected (85%)',
  },
  {
    timestamp: '2024-01-17T14:20:05Z',
    level: 'error',
    message: 'Failed to connect to external service',
  },
  {
    timestamp: '2024-01-17T14:15:30Z',
    level: 'info',
    message: 'Security updates installed',
  },
  {
    timestamp: '2024-01-17T14:10:20Z',
    level: 'info',
    message: 'Network interface configured',
  },
  {
    timestamp: '2024-01-17T14:05:15Z',
    level: 'warning',
    message: 'Disk space usage at 78%',
  },
  {
    timestamp: '2024-01-17T14:00:00Z',
    level: 'info',
    message: 'System boot completed',
  },
]

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getLogLevelColor = (level: string) => {
  switch (level) {
    case 'error':
      return 'text-red-600'
    case 'warning':
      return 'text-yellow-600'
    default:
      return 'text-blue-600'
  }
}

export default function LogsPage() {
  const handleExport = () => {
    // Simulate export functionality
    const logText = mockLogs
      .map(
        log =>
          `[${log.timestamp}] ${log.level.toUpperCase()}: ${log.message}`,
      )
      .join('\n')

    const blob = new Blob([logText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'instance-logs.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleRefresh = () => {
    // Simulate refresh functionality
    console.log('Refreshing logs...')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Terminal className="mr-2 h-5 w-5" />
              System Logs
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Recent system events and application logs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full">
            <div className="space-y-2">
              {mockLogs.map((log, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex-shrink-0">
                    <Badge
                      variant="outline"
                      className={getLogLevelColor(log.level)}
                    >
                      {log.level.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono">{log.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(log.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
