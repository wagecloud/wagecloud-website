import { genQueryCrud } from '@/lib/query/gen-crud-query'
import { Arch } from './arch.type'

export const {
  read: useReadArch,
  list: useListArch,
  create: useCreateArch,
  patch: usePatchArch,
  delete: useDeleteArch,
} = genQueryCrud<Arch>('arch')
