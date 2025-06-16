import { customFetchStandard } from '../custom-fetch'
import {
  Account,
  CreateAccountParams,
  PatchAccountParams,
} from './account.type'

export async function getMe() {
  return customFetchStandard<Account>('me')
}

export async function getAccount(id: Account['id']) {
  return customFetchStandard<Account>(`account/${id}`)
}

export async function createAccount(params: CreateAccountParams) {
  return customFetchStandard<Account>(`account`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export async function patchAccount(params: PatchAccountParams) {
  return customFetchStandard<Account>(`account/${params.id}`, {
    method: 'PATCH',
    body: JSON.stringify(params),
  })
}

export async function deleteAccount(id: Account['id']) {
  return customFetchStandard<void>(`account/${id}`, {
    method: 'DELETE',
  })
}
