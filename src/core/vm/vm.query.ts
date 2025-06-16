import { genQueryCrud } from '@/lib/query/gen-crud-query'
import { VM } from './vm.type'
import { useMutation } from '@tanstack/react-query'
import { getQueryClient } from '../query-client'
import { SuccessRes } from '../response/response.type'
import { customFetch } from '../custom-fetch'

const queryClient = getQueryClient()

export const {
  read: useReadVM,
  list: useListVM,
  create: useCreateVM,
  patch: usePatchVM,
  delete: useDeleteVM,
} = genQueryCrud<VM>('instance')

export const useStartVM = () =>
  useMutation({
    mutationFn: async (id: string) => {
      const response = await customFetch(`vm/start/${id}`, {
        method: 'POST',
      })
      return response.json() as Promise<SuccessRes<null>>
    },
    onSuccess(data, variables) {
      queryClient.invalidateQueries({ queryKey: ['vm', variables] })
    },
  })

export const useStopVM = () =>
  useMutation({
    mutationFn: async (id: string) => {
      const response = await customFetch(`vm/stop/${id}`, {
        method: 'POST',
      })
      return response.json() as Promise<SuccessRes<null>>
    },
    onSuccess(data, variables) {
      queryClient.invalidateQueries({ queryKey: ['vm', variables] })
    },
  })
