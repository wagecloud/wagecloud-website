import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ instance_id: string }>
}

export default async function InstancePage({ params }: Readonly<Props>) {
  const { instance_id } = await params
  redirect(`/instance/${instance_id}/overview`)
}
