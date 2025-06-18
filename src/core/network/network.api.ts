import qs from 'qs'
import { customFetchStandard } from '../custom-fetch'
import { GetNetworkParams, Network } from './network.type'

export async function getNetwork(params: GetNetworkParams) {
  return customFetchStandard<Network>(`network/?${qs.stringify(params)}`)
}

// export async function listNetworks(params: ListNetworksParams) {
//   return customFetchPagination<Network>(`instance/network/?${qs.stringify(params)}`, {
//     method: 'GET',
//   })
// }

// export async function createNetwork(params: CreateNetworkParams) {
//   return customFetchStandard<Network>(`instance/network`, {
//     method: 'POST',
//     body: JSON.stringify(params),
//   })
// }

// export async function patchNetwork(params: PatchNetworkParams) {
//   return customFetchStandard<Network>(`instance/network/${params.id}`, {
//     method: 'PATCH',
//     body: JSON.stringify(params),
//   })
// }

// export async function deleteNetwork(id: Network['id']) {
//   return customFetchStandard<void>(`instance/network/${id}`, {
//     method: 'DELETE',
//   })
// }
