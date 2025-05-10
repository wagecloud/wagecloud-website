"use client"

import { useState } from "react"
import { VMList } from "@/components/vm/vm-list"
import { VMDetails } from "@/components/vm/vm-details"
import { CreateVMForm } from "@/components/vm/create-vm-form"
import { SSHTerminal } from "@/components/ssh-terminal"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

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

export function VMDashboard() {
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
	const [view, setView] = useState<"list" | "details" | "create" | "ssh">(
		"list"
	)

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

	return (
		<div className="flex flex-col min-h-screen">
			<header className="border-b bg-background sticky top-0 z-10">
				<div className="container flex h-16 items-center px-4 sm:px-6">
					<h1 className="text-lg font-semibold">Virtual Machine Management</h1>
					<div className="ml-auto flex items-center space-x-4">
						{view === "list" && (
							<Button
								onClick={() => setView("create")}
								className="flex items-center gap-2"
							>
								<PlusCircle className="h-4 w-4" />
								Create VM
							</Button>
						)}
						{view !== "list" && (
							<Button variant="outline" onClick={() => setView("list")}>
								Back to List
							</Button>
						)}
					</div>
				</div>
			</header>

			<main className="flex-1 container py-6 px-4 sm:px-6">
				{view === "list" && (
					<VMList
						vms={vms}
						onSelect={(vm) => {
							setSelectedVM(vm)
							setView("details")
						}}
						onStatusChange={handleStatusChange}
					/>
				)}
				{view === "details" && selectedVM && (
					<VMDetails
						vm={selectedVM}
						onUpdate={handleUpdateVM}
						onDelete={handleDeleteVM}
						onConnect={() => setView("ssh")}
						onStatusChange={(status) =>
							handleStatusChange(selectedVM.id, status)
						}
					/>
				)}
				{view === "create" && (
					<CreateVMForm
						onSubmit={handleCreateVM}
						onCancel={() => setView("list")}
					/>
				)}
				{view === "ssh" && selectedVM && (
					<SSHTerminal vm={selectedVM} onClose={() => setView("details")} />
				)}
			</main>
		</div>
	)
}
