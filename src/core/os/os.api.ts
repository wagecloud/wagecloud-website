import qs from 'qs'
import { customFetchPagination, customFetchStandard } from '../custom-fetch'
import { CreateOSParams, ListOSsParams, OS, PatchOSParams } from './os.type'

export async function getOS(id: OS['id']) {
  return customFetchStandard<OS>(`os/${id}`)
}

export async function listOSs(params: ListOSsParams) {
  return customFetchPagination<OS>(`os/?${qs.stringify(params)}`, {
    method: 'GET',
  })
}

export async function createOS(params: CreateOSParams) {
  return customFetchStandard<OS>(`os`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export async function patchOS(params: PatchOSParams) {
  return customFetchStandard<OS>(`os/${params.id}`, {
    method: 'PATCH',
    body: JSON.stringify(params),
  })
}

export async function deleteOS(id: OS['id']) {
  return customFetchStandard<void>(`os/${id}`, {
    method: 'DELETE',
  })
}
