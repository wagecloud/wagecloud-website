import { StorageComponent } from './components/storage'

type Props = {
  params: Promise<{ instance_id: string }>
}

export default async function StoragePage({ params }: Readonly<Props>) {
  const { instance_id } = await params

  return (
    <StorageComponent instanceId={instance_id}></StorageComponent>
  )
}
