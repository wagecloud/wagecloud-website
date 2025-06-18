import { GetNetworkParams } from './network.type'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getNetwork } from './network.api'

// const queryClient = getQueryClient()

export const useSuspenseGetNetwork = (params: GetNetworkParams) => useSuspenseQuery({
  queryKey: ['network', params],
  queryFn: () => getNetwork(params),
})

// export const useListNetworks = (params: ListNetworksParams) => useInfiniteQuery({
//   queryKey: ['network', 'list', params],
//   queryFn: ({ pageParam }) => listNetworks(pageParam),
//   getNextPageParam: (lastPageRes, _, lastPageParam) => {
//     if (!lastPageRes.pagination.next_page && !lastPageRes.pagination.next_cursor) {
//       return undefined
//     }

//     return {
//       ...lastPageParam,
//       page: lastPageRes.pagination.next_page,
//       cursor: lastPageRes.pagination.next_cursor,
//       limit: lastPageParam.limit,
//     }
//   },
//   initialPageParam: params,
// })

// export const useCreateNetwork = () => useMutation({
//   mutationFn: createNetwork,
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ['network', 'list'] })
//   },
// })

// export const usePatchNetwork = () => useMutation({
//   mutationFn: patchNetwork,
//   onSuccess: (data) => {
//     queryClient.invalidateQueries({ queryKey: ['network', data.id] })
//   },
// })

// export const useDeleteNetwork = () => useMutation({
//   mutationFn: deleteNetwork,
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ['network', 'list'] })
//   },
// })
