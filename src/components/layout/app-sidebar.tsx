'use client'
import { LayoutDashboard, PlusCircle, Settings, HelpCircle, LogOut, Server, Image, File, DatabaseBackup, AlertCircle, BookTemplate } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Create Instance',
    url: '/instance/create',
    icon: PlusCircle,
  },
  {
    title: 'Images',
    url: '/images',
    icon: File,
  },
  {
    title: 'Backup',
    url: '/backup',
    icon: DatabaseBackup,
  },
  {
    title: 'Alerts',
    url: '/alerts',
    icon: AlertCircle,
  },
  {
    title: 'Templates',
    url: '/templates',
    icon: BookTemplate,
  },
]

const settingsItems = [
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
  {
    title: 'Help & Support',
    url: '/help',
    icon: HelpCircle,
  },
]

export function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  // const { data } = useListInstances({
  //   page: 1,
  //   limit: 10,
  // })

  // const instances = data?.pages.flatMap(page => page.data) || []
  // const vmsCount = instances.length || 0
  // const runningVmsCount = instances.filter(vm => vm.status === 'running').length || 0
  // const stoppedVmsCount = vmsCount - runningVmsCount

  const currentView = pathname.split('/')[1] || 'dashboard'

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex aspect-square size-5 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Server className="size-2" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Wagecloud</span>
            <span className="truncate text-xs text-sidebar-foreground/70">Cloud Management</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={currentView === item.url.split('/')[1]} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            <span>Overview</span>
            <Activity className="size-4 text-sidebar-foreground/50" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-3 px-2">
              <div className="flex items-center justify-between rounded-lg bg-sidebar-accent/50 p-3">
                <div className="flex items-center gap-2">
                  <Server className="size-4 text-sidebar-foreground/70" />
                  <span className="text-sm font-medium">Total VMs</span>
                </div>
                <Badge variant="secondary" className="font-mono">
                  {vmsCount}
                </Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-green-500/10 p-3">
                <div className="flex items-center gap-2">
                  <Play className="size-4 text-green-600" />
                  <span className="text-sm font-medium">Running</span>
                </div>
                <Badge className="bg-green-500/20 text-green-700 hover:bg-green-500/30 dark:text-green-400 font-mono">
                  {runningVmsCount}
                </Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-red-500/10 p-3">
                <div className="flex items-center gap-2">
                  <Pause className="size-4 text-red-600" />
                  <span className="text-sm font-medium">Stopped</span>
                </div>
                <Badge className="bg-red-500/20 text-red-700 hover:bg-red-500/30 dark:text-red-400 font-mono">
                  {stoppedVmsCount}
                </Badge>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup> */}

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={currentView === item.url.split('/')[1]} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <button
                className="w-full"
                onClick={() => {
                  globalThis?.localStorage?.removeItem?.('token')
                  router.push('/login')
                  console.log('Logged out and redirected to login page')
                }}
              >
                <LogOut />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
