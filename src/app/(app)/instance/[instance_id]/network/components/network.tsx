'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useSuspenseGetNetwork } from '@/core/network/network.query'
import { useSuspenseGetInstance } from '@/core/instance/instance.query'
import { Network } from 'lucide-react'
import { type Network as NetworkType } from '@/core/network/network.type'

export function NetworkComponent({
  instanceId,
}: Readonly<{ instanceId: string }>) {
  const { data: instance } = useSuspenseGetInstance(instanceId)
  const { data: network } = useSuspenseGetNetwork({
    instance_id: instanceId,
  })

  // Show loading state if data is not available
  if (!instance || !network) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Network className="mr-2 h-5 w-5" />
              Network Configuration
            </CardTitle>
            <CardDescription>
              Manage network settings and security groups
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {[...Array(2)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
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
          <CardTitle className="flex items-center">
            <Network className="mr-2 h-5 w-5" />
            Network Configuration
          </CardTitle>
          <CardDescription>
            Manage network settings and security groups
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-sm font-medium">Public IP Address</Label>
              <Input
                value={network.public_ip || 'Not assigned'}
                readOnly
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Private IP Address</Label>
              <Input value={network.private_ip} readOnly className="mt-1" />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Network Details</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Region
                  </Label>
                  <p className="font-medium">{instance.region_id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    MAC Address
                  </Label>
                  <p className="font-medium font-mono text-sm">
                    {network.mac_address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-2">Security Groups</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">default-web-sg</p>
                  <p className="text-sm text-muted-foreground">
                    HTTP, HTTPS access
                  </p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">ssh-access-sg</p>
                  <p className="text-sm text-muted-foreground">
                    SSH access from specific IPs
                  </p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-2">Network Interfaces</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">eth0</p>
                  <p className="text-sm text-muted-foreground">
                    Primary network interface
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{network.private_ip}</p>
                  <p className="text-sm text-muted-foreground">Private IP</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
