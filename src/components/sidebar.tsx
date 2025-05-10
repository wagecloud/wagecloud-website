"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
	LayoutDashboard,
	Server,
	PlusCircle,
	Menu,
	X,
	Activity,
	Settings,
	HelpCircle,
	LogOut,
} from "lucide-react"
import type { View } from "@/components/vm/vm-dashboard-layout"

interface SidebarProps {
	currentView: View
	setView: (view: View) => void
	vmsCount: number
	runningVmsCount: number
	isMobile: boolean
}

export function Sidebar({
	currentView,
	setView,
	vmsCount,
	runningVmsCount,
	isMobile,
}: SidebarProps) {
	const [isOpen, setIsOpen] = useState(false)

	const toggleSidebar = () => {
		setIsOpen(!isOpen)
	}

	const handleNavigation = (view: View) => {
		setView(view)
		if (isMobile) {
			setIsOpen(false)
		}
	}

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
				className={cn(
					"bg-background border-r flex flex-col h-screen z-40",
					isMobile
						? `fixed inset-y-0 left-0 transform transition-transform duration-200 ease-in-out w-64 ${
								isOpen ? "translate-x-0" : "-translate-x-full"
						  }`
						: "w-64"
				)}
			>
				<div className="p-6">
					<h1 className="text-xl font-bold">VM Manager</h1>
				</div>

				<div className="px-3 py-2">
					<div className="space-y-1">
						<Button
							variant={currentView === "dashboard" ? "secondary" : "ghost"}
							className="w-full justify-start"
							onClick={() => handleNavigation("dashboard")}
						>
							<LayoutDashboard className="mr-2 h-4 w-4" />
							Dashboard
						</Button>
						<Button
							variant={currentView === "list" ? "secondary" : "ghost"}
							className="w-full justify-start"
							onClick={() => handleNavigation("list")}
						>
							<Server className="mr-2 h-4 w-4" />
							Virtual Machines
						</Button>
						<Button
							variant={currentView === "create" ? "secondary" : "ghost"}
							className="w-full justify-start"
							onClick={() => handleNavigation("create")}
						>
							<PlusCircle className="mr-2 h-4 w-4" />
							Create VM
						</Button>
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
