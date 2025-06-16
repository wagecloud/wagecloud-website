'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  PlusCircle,
  Menu,
  X,
  Activity,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react'
import { useMobile } from '@/hooks/use-mobile'
import { useListVM } from '@/core/vm/vm.query'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Sidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)
  const { data } = useListVM({
    page: 1,
    limit: 10,
  })
  const vmsCount = data?.length || 0
  const runningVmsCount
    = data?.filter(vm => vm.status === 'running').length || 0

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const currentView = pathname.split('/')[1] || 'dashboard'

  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}

      <div
        className={cn('bg-background border-r flex flex-col h-screen z-40', {
          'fixed inset-y-0 left-0 transform transition-transform duration-200 ease-in-out w-64':
            isMobile,
          'translate-x-0': isMobile && isOpen,
          'translate-x-full': isMobile && !isOpen,
          'w-64': !isMobile,
        })}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold">VM Manager</h1>
        </div>

        <div className="px-3 py-2">
          <div className="flex flex-col space-y-1">
            <Link href="/dashboard">
              <Button
                variant={currentView === 'dashboard' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                // onClick={() => handleNavigation("dashboard")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            {/* <Link href="/machines">
              <Button
                // variant={currentView === "list" ? "secondary" : "ghost"}
                className="w-full justify-start"
                // onClick={() => handleNavigation("list")}
              >
                <Server className="mr-2 h-4 w-4" />
                Virtual Machines
              </Button>
            </Link> */}
            <Link href="/create">
              <Button
                variant={currentView === 'create' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                // onClick={() => handleNavigation("create")}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create VM
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-4 px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight">
            Overview
          </h2>
          <div className="space-y-1">
            <div className="flex justify-between items-center px-4 py-2 text-sm">
              <span>Total VMs</span>
              <span className="bg-muted rounded-full px-2 py-0.5 text-xs font-medium">
                {vmsCount}
              </span>
            </div>
            <div className="flex justify-between items-center px-4 py-2 text-sm">
              <span>Running</span>
              <span className="bg-green-500/20 text-green-700 dark:text-green-400 rounded-full px-2 py-0.5 text-xs font-medium">
                {runningVmsCount}
              </span>
            </div>
            <div className="flex justify-between items-center px-4 py-2 text-sm">
              <span>Stopped</span>
              <span className="bg-red-500/20 text-red-700 dark:text-red-400 rounded-full px-2 py-0.5 text-xs font-medium">
                {vmsCount - runningVmsCount}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto px-3 py-2">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Activity className="mr-2 h-4 w-4" />
              Monitoring
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </Button>
          </div>
        </div>

        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
