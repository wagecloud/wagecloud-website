import qs from 'qs'
import { customFetchStandard, customFetchPagination } from '../custom-fetch'
import { Arch, CreateArchParams, ListArchsParams, PatchArchParams } from './arch.type'

export async function getArch(id: Arch['id']) {
  return customFetchStandard<Arch>(`os/arch/${id}`)
}

export async function listArchs(params: ListArchsParams) {
  return customFetchPagination<Arch>(`os/arch/?${qs.stringify(params)}`, {
    method: 'GET',
  })
}

export async function createArch(params: CreateArchParams) {
  return customFetchStandard<Arch>(`os/arch`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export async function patchArch(params: PatchArchParams) {
  return customFetchStandard<Arch>(`os/arch/${params.id}`, {
    method: 'PATCH',
    body: JSON.stringify(params),
  })
}

export async function deleteArch(id: Arch['id']) {
  return customFetchStandard<void>(`os/arch/${id}`, {
    method: 'DELETE',
  })
}
