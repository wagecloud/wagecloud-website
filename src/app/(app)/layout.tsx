import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AlertModalProvider } from '@/components/modal/alert/alert-modal-provider'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/core/query-client'
import { Sidebar } from '@/components/layout/sidebar'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  // if (!token) {
  //   return redirect("/about");
  // }

  const queryClient = getQueryClient()

  // look ma, no await
  // queryClient.prefetchQuery({
  //   queryKey: ["account"],
  //   queryFn: () => {
  //     return fetch("http://khoakomlem-internal.ddns.net:3000/api/v1/account", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         username: "khoakomlem",
  //         password: "khoakomlem",
  //       }),
  //     });
  //   },
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AlertModalProvider>
        <main className="flex flex-row overflow-y-auto">
          <Sidebar />
          <div className="p-6 grow">{children}</div>
        </main>
      </AlertModalProvider>
    </HydrationBoundary>
  )
}
