'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Shield, Key, Eye } from 'lucide-react'

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Manage SSH keys, security groups, and access controls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">SSH Key Pairs</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">my-keypair</p>
                      <p className="text-sm text-muted-foreground">
                        RSA 2048-bit
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Active</Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
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
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Active</Badge>
                    <Button variant="outline" size="sm">
                      View Rules
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">ssh-access-sg</p>
                    <p className="text-sm text-muted-foreground">
                      SSH access from specific IPs
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Active</Badge>
                    <Button variant="outline" size="sm">
                      View Rules
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Security Rules</h4>
              <div className="space-y-2">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">HTTP (Port 80)</p>
                      <p className="text-sm text-muted-foreground">
                        Allow inbound HTTP traffic
                      </p>
                    </div>
                    <Badge variant="outline">Inbound</Badge>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Source: 0.0.0.0/0 | Protocol: TCP | Port: 80
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">HTTPS (Port 443)</p>
                      <p className="text-sm text-muted-foreground">
                        Allow inbound HTTPS traffic
                      </p>
                    </div>
                    <Badge variant="outline">Inbound</Badge>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Source: 0.0.0.0/0 | Protocol: TCP | Port: 443
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">SSH (Port 22)</p>
                      <p className="text-sm text-muted-foreground">
                        Allow SSH access from specific IPs
                      </p>
                    </div>
                    <Badge variant="outline">Inbound</Badge>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Source: 192.168.1.0/24 | Protocol: TCP | Port: 22
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">
                Security Recommendations
              </h4>
              <div className="space-y-2">
                <div className="p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                  <p className="text-sm font-medium text-yellow-800">
                    Enable Two-Factor Authentication
                  </p>
                  <p className="text-sm text-yellow-700">
                    Add an extra layer of security to your SSH access
                  </p>
                </div>
                <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                  <p className="text-sm font-medium text-blue-800">
                    Review Security Groups
                  </p>
                  <p className="text-sm text-blue-700">
                    Regularly audit your security group rules
                  </p>
                </div>
                <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                  <p className="text-sm font-medium text-green-800">
                    Keep SSH Keys Secure
                  </p>
                  <p className="text-sm text-green-700">
                    Your SSH key pairs are properly configured
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
