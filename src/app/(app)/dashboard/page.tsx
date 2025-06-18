import { StatusCards } from './components/status-cards'
import { Instances } from './components/instances'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/core/query-client'

export default async function DashboardPage() {
  const queryClient = getQueryClient()

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Manage your virtual machines and resources</p>
      </div>
      <StatusCards />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Instances />
      </HydrationBoundary>
    </div>
  )
}
