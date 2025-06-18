import { Region, ListRegionsParams } from './region.type'
import { useInfiniteQuery, useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { getQueryClient } from '../query-client'
import { createRegion, deleteRegion, getRegion, listRegions, patchRegion } from './region.api'

const queryClient = getQueryClient()

export const useSuspenseGetRegion = (id: Region['id']) => useSuspenseQuery({
  queryKey: ['region', id],
  queryFn: () => getRegion(id),
})

export const useListRegions = (params: ListRegionsParams) => useInfiniteQuery({
  queryKey: ['region', 'list', params],
  queryFn: ({ pageParam }) => listRegions(pageParam),
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

export const useCreateRegion = () => useMutation({
  mutationFn: createRegion,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['region', 'list'] })
  },
})

export const usePatchRegion = () => useMutation({
  mutationFn: patchRegion,
  onSuccess: (data) => {
    queryClient.invalidateQueries({ queryKey: ['region', data.id] })
  },
})

export const useDeleteRegion = () => useMutation({
  mutationFn: deleteRegion,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['region', 'list'] })
  },
})
