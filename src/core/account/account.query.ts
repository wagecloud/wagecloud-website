import { Account } from './account.type'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { getQueryClient } from '../query-client'
import {
  createAccount,
  deleteAccount,
  getAccount,
  getMe,
  patchAccount,
} from './account.api'

const queryClient = getQueryClient()

export const useSuspenseGetMe = () => useSuspenseQuery({
  queryKey: ['account', 'me'],
  queryFn: getMe,
})

export const useSuspenseGetAccount = (id: Account['id']) =>
  useSuspenseQuery({
    queryKey: ['account', id],
    queryFn: () => getAccount(id),
  })

export const useCreateAccount = () =>
  useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account', 'list'] })
    },
  })

export const usePatchAccount = () =>
  useMutation({
    mutationFn: patchAccount,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['account', data.id] })
    },
  })

export const useDeleteAccount = () =>
  useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account', 'list'] })
    },
  })
