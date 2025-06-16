import { genQueryCrud } from '@/lib/query/gen-crud-query'
import { OS } from './os.type'

export const {
  read: useReadOS,
  list: useListOS,
  create: useCreateOS,
  patch: usePatchOS,
  delete: useDeleteOS,
} = genQueryCrud<OS>('os')
