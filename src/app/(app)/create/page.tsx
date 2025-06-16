'use client'

import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useListOS } from '@/core/os/os.query'
import { useListArch } from '@/core/arch/arch.query'
import { Textarea } from '@/components/ui/textarea'

export default function CreatePage() {
  const [newVM, setNewVM] = useState({
    userdata: {
      'name': '',
      'ssh-authorized-keys': [] as string[],
      'password': '',
    },
    metadata: {
      'local-hostname': '',
    },
    spec: {
      os_id: '',
      arch_id: '',
      memory: 1024, // 1GB default
      cpu: 1,
      storage: 20, // 20GB default
    },
  })

  const { data: oss } = useListOS({
    page: 1,
    limit: 100,
  })

  const { data: archs } = useListArch({
    page: 1,
    limit: 100,
  })

  const isFormValid = () => {
    const { userdata, metadata, spec } = newVM
    return (
      userdata.name.length >= 1
      && userdata.name.length <= 255
      && userdata.password.length >= 8
      && userdata.password.length <= 72
      && metadata['local-hostname'].length > 0
      && spec.os_id.length > 0
      && spec.arch_id.length > 0
      && spec.memory >= 512
      && spec.memory <= 262144
      && spec.cpu >= 1
      && spec.cpu <= 64
      && spec.storage >= 10
      && spec.storage <= 2048
    )
  }

  const handleInputChange = (
    section: 'userdata' | 'metadata' | 'spec',
    field: string,
    value: any,
  ) => {
    setNewVM(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleSSHKeysChange = (value: string) => {
    const keys = value.split('\n').filter(key => key.trim().length > 0)
    handleInputChange('userdata', 'ssh-authorized-keys', keys)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Card className="mx-auto ">
      <CardHeader>
        <CardTitle>Create New Virtual Machine</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="mb-4">
          <Tabs defaultValue="basic" className="flex flex-col space-y-2">
            <TabsList className="p-1">
              <TabsTrigger value="basic">Basic Settings</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">VM Name</Label>
                  <Input
                    id="name"
                    value={newVM.userdata.name}
                    onChange={e =>
                      handleInputChange('userdata', 'name', e.target.value)}
                    placeholder="My Virtual Machine"
                    required
                    minLength={1}
                    maxLength={255}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="hostname">Hostname</Label>
                  <Input
                    id="hostname"
                    value={newVM.metadata['local-hostname']}
                    onChange={e =>
                      handleInputChange(
                        'metadata',
                        'local-hostname',
                        e.target.value,
                      )}
                    placeholder="my-vm"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="os">Operating System</Label>
                  <Select
                    value={newVM.spec.os_id}
                    onValueChange={value =>
                      handleInputChange('spec', 'os_id', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select OS" />
                    </SelectTrigger>
                    <SelectContent>
                      {oss?.map(os => (
                        <SelectItem key={os.id} value={os.id}>
                          {os.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="arch">Architecture</Label>
                  <Select
                    value={newVM.spec.arch_id}
                    onValueChange={value =>
                      handleInputChange('spec', 'arch_id', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Architecture" />
                    </SelectTrigger>
                    <SelectContent>
                      {archs?.map(arch => (
                        <SelectItem key={arch.id} value={arch.id}>
                          {arch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="resources">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="cpu">CPU Cores</Label>
                  <Select
                    value={newVM.spec.cpu.toString()}
                    onValueChange={value =>
                      handleInputChange('spec', 'cpu', Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select CPU cores" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 4, 8, 16, 32, 64].map(cores => (
                        <SelectItem key={cores} value={cores.toString()}>
                          {cores}
                          {' '}
                          {cores === 1 ? 'Core' : 'Cores'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="memory">Memory (MB)</Label>
                  <Select
                    value={newVM.spec.memory.toString()}
                    onValueChange={value =>
                      handleInputChange(
                        'spec',
                        'memory',
                        Number.parseInt(value),
                      )}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select memory" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        512, 1024, 2048, 4096, 8192, 16384, 32768, 65536,
                        131072, 262144,
                      ].map(mb => (
                        <SelectItem key={mb} value={mb.toString()}>
                          {mb}
                          {' '}
                          MB
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="storage">Storage (GB)</Label>
                  <Select
                    value={newVM.spec.storage.toString()}
                    onValueChange={value =>
                      handleInputChange(
                        'spec',
                        'storage',
                        Number.parseInt(value),
                      )}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select storage" />
                    </SelectTrigger>
                    <SelectContent>
                      {[10, 20, 40, 50, 100, 200, 500, 1000, 2048].map(gb => (
                        <SelectItem key={gb} value={gb.toString()}>
                          {gb}
                          {' '}
                          GB
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="security">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newVM.userdata.password}
                    onChange={e =>
                      handleInputChange('userdata', 'password', e.target.value)}
                    required
                    minLength={8}
                    maxLength={72}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ssh-keys">
                    SSH Authorized Keys (one per line)
                  </Label>
                  <Textarea
                    id="ssh-keys"
                    value={newVM.userdata['ssh-authorized-keys'].join('\n')}
                    onChange={e => handleSSHKeysChange(e.target.value)}
                    placeholder="ssh-rsa AAAA..."
                    className="h-32"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={!isFormValid()}>
            Create VM
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
