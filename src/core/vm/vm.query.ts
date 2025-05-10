import { genQueryCrud } from "@/lib/query/gen-crud-query"
import { VM } from "./vm.type"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../query-client/query-client"
import { SuccessRes } from "../response/response.type"
import { customFetch } from "../query-client/custom-fetch"

export const {
	read: useReadVM,
	list: useListVM,
	create: useCreateVM,
	patch: usePatchVM,
	delete: useDeleteVM,
} = genQueryCrud<VM>("vm")

export const useStartVM = () => useMutation({
  mutationFn: async (id: string) => {
    const response = await customFetch(`vm/start/${id}`, {
      method: "POST",
    })
    return response.json() as Promise<SuccessRes<null>>
  },
  onSuccess(data, variables) {
    queryClient.invalidateQueries({ queryKey: ["vm", variables] })
  },
})

export const useStopVM = () => useMutation({
  mutationFn: async (id: string) => {
    const response = await customFetch(`vm/stop/${id}`, {
      method: "POST",
    })
    return response.json() as Promise<SuccessRes<null>>
  },
  onSuccess(data, variables) {
    queryClient.invalidateQueries({ queryKey: ["vm", variables] })
  },
})
