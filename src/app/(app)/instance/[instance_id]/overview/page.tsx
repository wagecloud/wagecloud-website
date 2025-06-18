import { Overview } from './components/overview'

type Props = {
  params: Promise<{ instance_id: string }>
}

export default async function OverviewPage({ params }: Readonly<Props>) {
  const { instance_id } = await params

  return (
    <Overview instanceId={instance_id} />
  )
}
