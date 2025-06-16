import qs from 'qs'
import { customFetchPagination, customFetchStandard } from '../custom-fetch'
import { SuccessResponse } from '../response.type'
import { CreateInstanceParams, Instance, ListInstancesParams, PatchInstanceParams } from './instance.type'

export async function getInstance(id: Instance['id']) {
  return customFetchStandard<SuccessResponse<Instance>>(`instance/${id}`)
}

export async function listInstances(params: ListInstancesParams) {
  return customFetchPagination<Instance>(`instance/?${qs.stringify(params)}`, {
    method: 'GET',
  })
}

export async function createInstance(params: CreateInstanceParams) {
  return customFetchStandard<Instance>(`instance`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export async function patchInstance(params: PatchInstanceParams) {
  return customFetchStandard<Instance>(`instance/${params.id}`, {
    method: 'PATCH',
    body: JSON.stringify(params),
  })
}

export async function deleteInstance(id: Instance['id']) {
  return customFetchStandard<void>(`instance/${id}`, {
    method: 'DELETE',
  })
}

export async function startInstance(id: Instance['id']) {
  return customFetchStandard<void>(`vm/start/${id}`, {
    method: 'POST',
  })
}

export async function stopInstance(id: Instance['id']) {
  return customFetchStandard<void>(`vm/stop/${id}`, {
    method: 'POST',
  })
}
