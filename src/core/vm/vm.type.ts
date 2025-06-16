export type VM = {
  id: string
  account_id: string
  network_id: string
  os_id: string
  arch_id: string
  name: string
  status: 'running' | 'stopped' | 'restarting'
  os: string
  cpu: number
  ram: number
  storage: number
  created_at: string
}

export type CreateVM = Omit<VM, 'id' | 'created_at' | 'account_id' | 'network_id'>

export type PatchVM = Partial<Omit<VM, 'id' | 'created_at' | 'account_id' | 'network_id'>>
