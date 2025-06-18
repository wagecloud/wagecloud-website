import { ClientLayout } from './components/client-layout'

export default function InstanceLayout({
  params,
  children,
}: Readonly<{
  params: { instance_id: string }
  children: React.ReactNode
}>) {
  return (
    <ClientLayout instanceId={params.instance_id}>
      {children}
    </ClientLayout>
  )
}
