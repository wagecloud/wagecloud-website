import { ListOSsParams, OS } from './os.type'
import { useInfiniteQuery, useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { getQueryClient } from '../query-client'
import { PaginationParams } from '../response.type'
import { createOS, deleteOS, getOS, listOSs, patchOS } from './os.api'

const queryClient = getQueryClient()

export const useSuspenseGetOS = (id: OS['id']) => useSuspenseQuery({
  queryKey: ['os', id],
  queryFn: () => getOS(id),
})

export const useListOSs = (params: PaginationParams<ListOSsParams>) => useInfiniteQuery({
  queryKey: ['os', 'list', params],
  queryFn: ({ pageParam }) => listOSs(pageParam),
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

export const useCreateOS = () => useMutation({
  mutationFn: createOS,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['os', 'list'] })
  },
})

export const usePatchOS = () => useMutation({
  mutationFn: patchOS,
  onSuccess: (data) => {
    queryClient.invalidateQueries({ queryKey: ['os', data.id] })
  },
})

export const useDeleteOS = () => useMutation({
  mutationFn: deleteOS,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['os', 'list'] })
  },
})
