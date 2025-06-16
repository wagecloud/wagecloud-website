import { PaginationParams } from '../response.type'

export enum InstanceStatus {
  RUNNING = 'running',
  STOPPED = 'stopped',
  RESTARTING = 'restarting',
}

export type Instance = {
  id: string
  account_id: string
  os_id: string
  arch_id: string
  name: string
  status: InstanceStatus
  cpu: number
  ram: number
  storage: number
  created_at: string
  updated_at: string
}

export type ListInstancesParams = PaginationParams<Partial<Omit<Instance, 'created_at'> & {
  created_at_from: number
  created_at_to: number
}>>

export type CreateInstanceParams = {
  basic: {
    name: string
    hostname: string
    os_id: string
    arch_id: string
  }
  resources: {
    memory: number // in MB
    cpu: number // number of cores
    storage: number // in GB
  }
  security: {
    'password': string
    'ssh-authorized-keys': string[]
  }
}
export type PatchInstanceParams = Partial<Omit<Instance, 'created_at' | 'account_id'>>
