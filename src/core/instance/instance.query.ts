import { Instance, ListInstancesParams } from './instance.type'
import { useInfiniteQuery, useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { getQueryClient } from '../query-client'
import { PaginationParams } from '../response.type'
import { createInstance, deleteInstance, getInstance, listInstances, patchInstance, startInstance, stopInstance } from './instance.api'

const queryClient = getQueryClient()

export const useSuspenseGetInstance = (id: Instance['id']) => useSuspenseQuery({
  queryKey: ['instance', id],
  queryFn: () => getInstance(id),
})

export const useListInstances = (params: PaginationParams<ListInstancesParams>) => useInfiniteQuery({
  queryKey: ['instance', 'list', params],
  queryFn: ({ pageParam }) => listInstances(pageParam),
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

export const useCreateInstance = () => useMutation({
  mutationFn: createInstance,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['instance', 'list'] })
  },
})

export const usePatchInstance = () => useMutation({
  mutationFn: patchInstance,
  onSuccess: (data) => {
    queryClient.invalidateQueries({ queryKey: ['instance', data.id] })
  },
})

export const useDeleteInstance = () => useMutation({
  mutationFn: deleteInstance,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['instance', 'list'] })
  },
})

export const useStartInstance = () => useMutation({
  mutationFn: startInstance,
  onSuccess: (_, variables) => {
    queryClient.invalidateQueries({ queryKey: ['instance', variables] })
  },
})

export const useStopInstance = () => useMutation({
  mutationFn: stopInstance,
  onSuccess: (_, variables) => {
    queryClient.invalidateQueries({ queryKey: ['instance', variables] })
  },
})
