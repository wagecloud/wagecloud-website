import { Arch, ListArchsParams } from './arch.type'
import { useInfiniteQuery, useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { getQueryClient } from '../query-client'
import { createArch, deleteArch, getArch, listArchs, patchArch } from './arch.api'

const queryClient = getQueryClient()

export const useSuspenseGetArch = (id: Arch['id']) => useSuspenseQuery({
  queryKey: ['arch', id],
  queryFn: () => getArch(id),
})

export const useListArchs = (params: ListArchsParams) => useInfiniteQuery({
  queryKey: ['arch', 'list', params],
  queryFn: ({ pageParam }) => listArchs(pageParam),
  getNextPageParam: (lastPageRes, _, lastPageParam) => {
    if (!lastPageRes.pagination.next_page && !lastPageRes.pagination.next_cursor) {
      return undefined
    }

    return {
      ...lastPageParam,
      page: lastPageRes.pagination.next_page,
      cursor: lastPageRes.pagination.next_cursor,
      limit: lastPageParam.limit,
    }
  },
  initialPageParam: params,
})

export const useCreateArch = () => useMutation({
  mutationFn: createArch,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['arch', 'list'] })
  },
})

export const usePatchArch = () => useMutation({
  mutationFn: patchArch,
  onSuccess: (data) => {
    queryClient.invalidateQueries({ queryKey: ['arch', data.id] })
  },
})

export const useDeleteArch = () => useMutation({
  mutationFn: deleteArch,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['arch', 'list'] })
  },
})
