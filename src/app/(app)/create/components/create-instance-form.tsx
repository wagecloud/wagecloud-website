'use client'

import type React from 'react'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useListOSs } from '@/core/os/os.query'
import { useListArchs } from '@/core/arch/arch.query'
import { Textarea } from '@/components/ui/textarea'
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'
import { SearchableDropdownSelect } from '@/components/ui/searchable-dropdown-select'
import { useCreateInstance } from '@/core/instance/instance.query'
import { ButtonLoading } from '@/components/ui/button-loading'

const STEPS = ['basic', 'resources', 'security'] as const
type Step = (typeof STEPS)[number]

const formSchema = z.object({
  basic: z.object({
    name: z.string().min(1, 'Name is required').max(255, 'Name is too long'),
    hostname: z.string().min(1, 'Hostname is required'),
    os_id: z.string().min(1, 'OS is required'),
    arch_id: z.string().min(1, 'Architecture is required'),
  }),
  resources: z.object({
    memory: z.number().min(512, 'Minimum memory is 512 MB').max(262144, 'Maximum memory is 262144 MB'),
    cpu: z.number().min(1, 'Minimum 1 CPU').max(64, 'Maximum 64 CPUs'),
    storage: z.number().min(10, 'Minimum 10 GB').max(2048, 'Maximum 2048 GB'),
  }),
  security: z.object({
    'password': z.string().min(8, 'Password must be at least 8 characters').max(72, 'Password is too long'),
    'ssh-authorized-keys': z.array(z.string()),
  }),
})

type FormData = z.infer<typeof formSchema>

export function CreateInstanceForm() {
  const [currentStep, setCurrentStep] = useState<Step>('basic')

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      basic: {
        name: '',
        hostname: '',
        os_id: '',
        arch_id: '',
      },
      resources: {
        memory: 1024,
        cpu: 1,
        storage: 10,
      },
      security: {
        'password': '',
        'ssh-authorized-keys': [],
      },
    },
  })

  const infiniteOSs = useListOSs({
    page: 1,
    limit: 5,
  })

  const infiniteArchs = useListArchs({
    page: 1,
    limit: 5,
  })

  const { ref: refTriggerOSs, items: oss } = useInfiniteScroll(infiniteOSs, 10)
  const { ref: refTriggerArchs, items: archs } = useInfiniteScroll(
    infiniteArchs,
    10,
  )

  const { mutateAsync: mutateCreateInstance } = useCreateInstance()

  const handleSSHKeysChange = (value: string) => {
    const keys = value.split('\n').filter(key => key.trim().length > 0)
    form.setValue('security.ssh-authorized-keys', keys)
  }

  const handleNext = async () => {
    const isValid = await form.trigger(currentStep)
    if (!isValid) return

    const currentIndex = STEPS.indexOf(currentStep)
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1])
    }
    else {
      // If on the last step, submit the form
      mutateCreateInstance(form.getValues())
    }
  }

  const handlePrevious = () => {
    const currentIndex = STEPS.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1])
    }
  }

  return (
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle>Create New Virtual Machine</CardTitle>
        <div className="flex items-center justify-between mt-4">
          {STEPS.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep === step
                    ? 'bg-primary text-primary-foreground'
                    : index < STEPS.indexOf(currentStep)
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                {index + 1}
              </div>
              <div className="ml-2 text-sm font-medium capitalize">{step}</div>
              {index < STEPS.length - 1 && (
                <div className="w-16 h-0.5 mx-4 bg-border" />
              )}
            </div>
          ))}
        </div>
      </CardHeader>
      <form>
        <CardContent className="mb-4">
          <Tabs value={currentStep} className="flex flex-col space-y-2">
            <TabsContent value="basic">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Account name</Label>
                  <Controller
                    name="basic.name"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="name"
                        placeholder="My account name"
                      />
                    )}
                  />
                  {form.formState.errors.basic?.name && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.basic.name.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="hostname">Hostname</Label>
                  <Controller
                    name="basic.hostname"
                    control={form.control}
                    render={({ field }) => (
                      <Input {...field} id="hostname" placeholder="my-vm" />
                    )}
                  />
                  {form.formState.errors.basic?.hostname && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.basic.hostname.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="os">Operating System</Label>
                  <Controller
                    name="basic.os_id"
                    control={form.control}
                    render={({ field }) => (
                      <SearchableDropdownSelect
                        {...field}
                        options={oss.map(os => ({
                          id: os.id,
                          label: os.name,
                        }))}
                        placeholder="Select OS..."
                        infiniteRef={refTriggerOSs}
                        hasNextPage={infiniteOSs.hasNextPage}
                        onSelectionChange={(value) => {
                          field.onChange(value[0])
                        }}
                      />
                    )}
                  />
                  {form.formState.errors.basic?.os_id && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.basic.os_id.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="arch">Architecture</Label>
                  <Controller
                    name="basic.arch_id"
                    control={form.control}
                    render={({ field }) => (
                      <SearchableDropdownSelect
                        {...field}
                        options={archs.map(arch => ({
                          id: arch.id,
                          label: arch.name,
                        }))}
                        placeholder="Select Architecture..."
                        infiniteRef={refTriggerArchs}
                        hasNextPage={infiniteArchs.hasNextPage}
                        onSelectionChange={(value) => {
                          field.onChange(value[0])
                        }}
                      />
                    )}
                  />
                  {form.formState.errors.basic?.arch_id && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.basic.arch_id.message}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="resources">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="cpu">CPU Cores</Label>
                  <Controller
                    name="resources.cpu"
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        value={field.value.toString()}
                        onValueChange={value =>
                          field.onChange(Number.parseInt(value))}
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
                    )}
                  />
                  {form.formState.errors.resources?.cpu && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.resources.cpu.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="memory">Memory (MB)</Label>
                  <Controller
                    name="resources.memory"
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        value={field.value.toString()}
                        onValueChange={value =>
                          field.onChange(Number.parseInt(value))}
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
                    )}
                  />
                  {form.formState.errors.resources?.memory && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.resources.memory.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="storage">Storage (GB)</Label>
                  <Controller
                    name="resources.storage"
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        value={field.value.toString()}
                        onValueChange={value =>
                          field.onChange(Number.parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select storage" />
                        </SelectTrigger>
                        <SelectContent>
                          {[10, 20, 40, 50, 100, 200, 500, 1000, 2048].map(
                            gb => (
                              <SelectItem key={gb} value={gb.toString()}>
                                {gb}
                                {' '}
                                GB
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {form.formState.errors.resources?.storage && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.resources.storage.message}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="security">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Controller
                    name="security.password"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="password"
                        minLength={8}
                        maxLength={72}
                      />
                    )}
                  />
                  {form.formState.errors.security?.password && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.security.password.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ssh-keys">
                    SSH Authorized Keys (one per line)
                  </Label>
                  <Controller
                    name="security.ssh-authorized-keys"
                    control={form.control}
                    render={({ field }) => (
                      <Textarea
                        value={field.value.join('\n')}
                        onChange={e => handleSSHKeysChange(e.target.value)}
                        placeholder="ssh-rsa AAAA..."
                        className="h-32"
                      />
                    )}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 'basic'}
          >
            Previous
          </Button>
          <ButtonLoading
            type="button"
            onClick={handleNext}
          >
            {currentStep === STEPS[STEPS.length - 1] ? 'Create' : 'Next'}
          </ButtonLoading>
        </CardFooter>
      </form>
    </Card>
  )
}
