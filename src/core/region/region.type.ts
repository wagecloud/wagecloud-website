import { PaginationParams } from '../response.type'

export type Region = {
  id: string
  name: string
}

export type ListRegionsParams = PaginationParams<Partial<Omit<Region, ''>>>

export type CreateRegionParams = Omit<Region, ''>

export type PatchRegionParams = Partial<Omit<Region, ''> & {
  new_id: string
}>
