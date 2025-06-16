import { PaginationParams } from '../response.type'

export type Arch = {
  id: string
  name: string
  createdAt: string
}

export type ListArchsParams = PaginationParams<Partial<Omit<Arch, 'createdAt'> & {
  createdAtFrom: number
  createdAtTo: number
}>>

export type CreateArchParams = Omit<Arch, 'createdAt'>

export type PatchArchParams = Partial<Omit<Arch, 'createdAt'>>
