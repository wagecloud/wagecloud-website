import { PaginationParams } from '../response.type'

export type OS = {
  id: string
  name: string
  createdAt: string
}

export type ListOSsParams = PaginationParams<Partial<Omit<OS, 'id' | 'createdAt'> & {
  createdAtFrom: number
  createdAtTo: number
}>>

export type CreateOSParams = Omit<OS, 'id' | 'createdAt'>

export type PatchOSParams = Partial<Omit<OS, 'createdAt'>>
