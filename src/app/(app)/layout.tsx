import { AlertModalProvider } from '@/components/modal/alert/alert-modal-provider'
import { Toaster } from 'sonner'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // TODO: remove this once the app is ready
  await (new Promise((resolve) => {
    // Simulate some async operation, e.g., fetching initial data
    setTimeout(resolve, 2000)
  }))

  // TODO: ass code
  if (typeof window !== 'undefined') {
    const token = globalThis?.localStorage?.getItem?.('token')

    if (!token?.length) {
      window.location.href = '/login'
    }
  }

  // const queryClient = getQueryClient()

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
    <AlertModalProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="absolute flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 w-fit">
            <div className="flex items-center gap-2 px-4">
              {/* <SidebarTrigger className="-ml-1" /> */}
              <Separator orientation="vertical" className="mr-2 h-4" />
              {/* <BreadcrumbNav /> */}
            </div>
          </header>
          {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div> */}
          <main className="flex flex-row h-screen">
            <Toaster position="top-right" />
            <div className="grow p-8 bg-gray-50">{children}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AlertModalProvider>

  )
}
