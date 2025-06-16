/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from '@tanstack/react-query'

import {
  type SuccessPaginationRes,
  type SuccessRes,
} from '@/core/response/response.type'

import { customFetchJson } from '@/core/custom-fetch'
import { getQueryClient } from '@/core/query-client'

export type CreateMethod<Item> = (body?: Record<string, any>) => Promise<Item>
export type ListMethod<Item> = (
  options?: Record<string, any>
) => Promise<Item[]>
export type ReadMethod<Item> = (
  id: string,
  options?: Record<string, any>
) => Promise<Item>
export type PatchMethod<Item> = (
  id: string,
  patch: Partial<Item>
) => Promise<Item>
export type DeleteMethod<Item> = (id: string, ...args: any[]) => Promise<Item>

export function genQueryCrud<
  Item,
  C extends CreateMethod<Item> = CreateMethod<Item>,
  L extends ListMethod<Item> = ListMethod<Item>,
  R extends ReadMethod<Item> = ReadMethod<Item>,
  P extends PatchMethod<Item> = PatchMethod<Item>,
  D extends DeleteMethod<Item> = DeleteMethod<Item>,
>(
  queryKey: string,
  methods: Partial<{
    create: C
    list: L
    read: R
    patch: P
    delete: D
  }> = {},
) {
  const queryClient = getQueryClient()
  const allMethods = {
    ...genDefaultCrudApi<Item>(queryKey),
    ...methods,
  }

  return {
    create() {
      return useMutation({
        mutationFn: allMethods.create,
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: [queryKey] })
        },
      })
    },
    list(...args: Parameters<L>) {
      return useQuery({
        queryKey: generateQueryKey(queryKey, args),
        queryFn: async () => allMethods.list(...args),
      })
    },
    read(id: string | undefined, ...args: ParametersExceptFirst<R>) {
      return useQuery({
        queryKey: generateQueryKey(queryKey, [id, ...args]),
        queryFn: async () => allMethods.read(id ?? '', ...args),
        enabled: Boolean(id),
      })
    },
    patch() {
      return useMutation({
        mutationFn: (variables: { id: string, patch: Partial<Item> }) =>
          allMethods.patch(variables.id, variables.patch),
        onSuccess(data, variables) {
          queryClient.invalidateQueries({ queryKey: [queryKey, variables.id] })
        },
      })
    },
    delete() {
      return useMutation({
        mutationFn: allMethods.delete,
        onSuccess(data, variables) {
          queryClient.invalidateQueries({ queryKey: [queryKey, variables] })
        },
      })
    },
  }
}

function genDefaultCrudApi<Item>(url: string): {
  create: CreateMethod<Item>
  list: ListMethod<Item>
  read: ReadMethod<Item>
  patch: PatchMethod<Item>
  delete: DeleteMethod<Item>
} {
  // Default value: fetch
  return {
    async create(body: Record<string, any> = {}) {
      cleanObject(body)
      return (
        await customFetchJson<SuccessRes<Item>>(url, {
          method: 'POST',
          body: JSON.stringify(body),
        })
      ).data
    },
    async list(options: Record<string, any> = {}) {
      cleanObject(options)

      return (
        await customFetchJson<SuccessPaginationRes<Item>>(
          `${url}${
            options ? `?${new URLSearchParams(options).toString()}` : ''
          }`,
        )
      ).data
    },
    async read(id: string, options: Record<string, any> = {}) {
      cleanObject(options)
      const query = new URLSearchParams(options).toString()
      return (
        await customFetchJson<SuccessRes<Item>>(
          `${url}/${id}${query ? `?${query}` : ''}`,
        )
      ).data
    },
    async patch(id: string, patch: Record<string, any> = {}) {
      cleanObject(patch)
      return (
        await customFetchJson<SuccessRes<Item>>(`${url}/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(patch),
        })
      ).data
    },
    async delete(id: string) {
      return (
        await customFetchJson<SuccessRes<Item>>(`${url}/${id}`, {
          method: 'DELETE',
        })
      ).data
    },
  }
}

function cleanObject(obj: Record<string, any>): Record<string, any> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined) acc[key] = value
    return acc
  }, {} as Record<string, any>)
}

function generateQueryKey(baseKey: string, args: any[]): (string | any)[] {
  return [baseKey, ...args.filter(arg => arg !== undefined)]
}

type ParametersExceptFirst<F> = F extends (arg0: any, ...rest: infer R) => any
  ? R
  : never
