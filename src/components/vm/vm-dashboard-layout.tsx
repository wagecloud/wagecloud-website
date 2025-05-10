"use client"

import { useState } from "react"
import { VMList } from "@/components/vm/vm-list"
import { VMDetails } from "@/components/vm/vm-details"
import { CreateVMForm } from "@/components/vm/create-vm-form"
import { SSHTerminal } from "@/components/ssh-terminal"
import { Sidebar } from "@/components/sidebar"
import { useMobile } from "@/hooks/use-mobile"

export type VM = {
	id: string
	name: string
	status: "running" | "stopped" | "restarting"
	os: string
	ip: string
	cpu: number
	memory: number
	storage: number
	createdAt: string
}

export type View = "dashboard" | "list" | "details" | "create" | "ssh"

export function VMDashboardLayout() {
	const isMobile = useMobile()
	const [vms, setVMs] = useState<VM[]>([
		{
			id: "vm-1",
			name: "Production Server",
			status: "running",
			os: "Ubuntu 22.04 LTS",
			ip: "192.168.1.101",
			cpu: 4,
			memory: 8,
			storage: 100,
			createdAt: "2023-10-15",
		},
		{
			id: "vm-2",
			name: "Development Server",
			status: "running",
			os: "Debian 11",
			ip: "192.168.1.102",
			cpu: 2,
			memory: 4,
			storage: 50,
			createdAt: "2023-11-20",
		},
		{
			id: "vm-3",
			name: "Test Environment",
			status: "stopped",
			os: "CentOS 8",
			ip: "192.168.1.103",
			cpu: 2,
			memory: 4,
			storage: 40,
			createdAt: "2024-01-05",
		},
	])

	const [selectedVM, setSelectedVM] = useState<VM | null>(null)
	const [view, setView] = useState<View>("dashboard")

	const handleCreateVM = (newVM: Omit<VM, "id" | "createdAt">) => {
		const vm: VM = {
			...newVM,
			id: `vm-${vms.length + 1}`,
			createdAt: new Date().toISOString().split("T")[0],
		}
		setVMs([...vms, vm])
		setView("list")
	}

	const handleUpdateVM = (updatedVM: VM) => {
		setVMs(vms.map((vm) => (vm.id === updatedVM.id ? updatedVM : vm)))
		setSelectedVM(updatedVM)
		setView("details")
	}

	const handleDeleteVM = (id: string) => {
		setVMs(vms.filter((vm) => vm.id !== id))
		setSelectedVM(null)
		setView("list")
	}

	const handleStatusChange = (
		id: string,
		status: "running" | "stopped" | "restarting"
	) => {
		setVMs(vms.map((vm) => (vm.id === id ? { ...vm, status } : vm)))
		if (selectedVM && selectedVM.id === id) {
			setSelectedVM({ ...selectedVM, status })
		}
	}

	const renderContent = () => {
		switch (view) {
			case "dashboard":
				return (
					<VMList
						vms={vms}
						onSelect={(vm) => {
							setSelectedVM(vm)
							setView("details")
						}}
						onStatusChange={handleStatusChange}
						showDashboard
					/>
				)
			case "list":
				return (
					<VMList
						vms={vms}
						onSelect={(vm) => {
							setSelectedVM(vm)
							setView("details")
						}}
						onStatusChange={handleStatusChange}
					/>
				)
			case "details":
				return selectedVM ? (
					<VMDetails
						vm={selectedVM}
						onUpdate={handleUpdateVM}
						onDelete={handleDeleteVM}
						onConnect={() => setView("ssh")}
						onStatusChange={(status) =>
							handleStatusChange(selectedVM.id, status)
						}
						onBack={() => setView("list")}
					/>
				) : (
					<div>No VM selected</div>
				)
			case "create":
				return (
					<CreateVMForm
						onSubmit={handleCreateVM}
						onCancel={() => setView("list")}
					/>
				)
			case "ssh":
				return selectedVM ? (
					<SSHTerminal vm={selectedVM} onClose={() => setView("details")} />
				) : (
					<div>No VM selected</div>
				)
			default:
				return <div>Unknown view</div>
		}
	}

	return (
		<div className="flex h-screen bg-muted/20">
			<Sidebar
				currentView={view}
				setView={setView}
				vmsCount={vms.length}
				runningVmsCount={vms.filter((vm) => vm.status === "running").length}
				isMobile={isMobile}
			/>
			<div className="flex-1 flex flex-col overflow-hidden">
				<main className="flex-1 overflow-y-auto p-4 md:p-6">
					{renderContent()}
				</main>
			</div>
		</div>
	)
}
