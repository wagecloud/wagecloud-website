import qs from 'qs'
import { customFetchStandard, customFetchPagination } from '../custom-fetch'
import { Region, CreateRegionParams, ListRegionsParams, PatchRegionParams } from './region.type'

export async function getRegion(id: Region['id']) {
  return customFetchStandard<Region>(`region/${id}`)
}

export async function listRegions(params: ListRegionsParams) {
  return customFetchPagination<Region>(`region/?${qs.stringify(params)}`, {
    method: 'GET',
  })
}

export async function createRegion(params: CreateRegionParams) {
  return customFetchStandard<Region>(`region`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export async function patchRegion(params: PatchRegionParams) {
  return customFetchStandard<Region>(`region/${params.id}`, {
    method: 'PATCH',
    body: JSON.stringify(params),
  })
}

export async function deleteRegion(id: Region['id']) {
  return customFetchStandard<void>(`region/${id}`, {
    method: 'DELETE',
  })
}
