import { NetworkComponent } from './components/network'

type Props = {
  params: Promise<{ instance_id: string }>
}

export default async function NetworkPage({ params }: Readonly<Props>) {
  const { instance_id } = await params
  return (
    <NetworkComponent instanceId={instance_id} />
  )
}
