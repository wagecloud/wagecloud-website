"use client"

import { useEffect, useState } from "react"
import { VMList } from "@/components/vm/vm-list"
import { VMDetails } from "@/components/vm/vm-details"
import { CreateVMForm } from "@/components/vm/create-vm-form"
import { SSHTerminal } from "@/components/ssh-terminal"
import { Sidebar } from "@/components/sidebar"
import { useMobile } from "@/hooks/use-mobile"
import {
	useListVM,
	useDeleteVM,
	usePatchVM,
	useCreateVM,
} from "@/core/vm/vm.query"
import { CreateVM, PatchVM } from "@/core/vm/vm.type"
import { AlertModalProvider } from "../modal/alert/alert-modal-provider"

export type View = "dashboard" | "list" | "details" | "create" | "ssh"

export function VMDashboardLayout() {
	const isMobile = useMobile()
	const { data: vms = [], refetch: refetchVM } = useListVM({
		page: 1,
		limit: 10,
	})
	const { mutateAsync: mutateCreateVM } = useCreateVM()
	const { mutateAsync: mutatePatchVM } = usePatchVM()
	const { mutateAsync: mutateDeleteVM } = useDeleteVM()

	const [selectedId, setSelectedId] = useState<string>()
	const [view, setView] = useState<View>("dashboard")

	const handleCreateVM = async (newVM: CreateVM) => {
		await mutateCreateVM(newVM)
		setView("list")
	}

	const handlePatchVM = async (id: string, patchVM: PatchVM) => {
		await mutatePatchVM({ id, patch: patchVM })
		setView("details")
	}

	const handleDeleteVM = async (id: string) => {
		await mutateDeleteVM(id)
		setSelectedId(undefined)
		setView("list")
	}

  useEffect(() => {
    const interval = setInterval(() => {
      refetchVM()
    }, 3000)
    return () => clearInterval(interval)
  }, [])

	const handleStatusChange = async (
		id: string,
		status: "running" | "stopped" | "restarting"
	) => {
		const vmToUpdate = vms.find((vm) => vm.id === id)
		if (vmToUpdate) {
			await mutatePatchVM({ id, patch: { status } })
		}
	}

	const renderContent = () => {
		switch (view) {
			case "dashboard":
				return (
					<VMList
						vms={vms}
						onSelect={(vm) => {
							if (vm.id === "new") {
								setView("create")
							} else {
								setSelectedId(vm.id)
								setView("details")
							}
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
              if (vm.id === "new") {
                setView("create")
              } else {
                setSelectedId(vm.id)
                setView("details")
              }
						}}
						onStatusChange={handleStatusChange}
					/>
				)
			case "details":
				return selectedId ? (
					<VMDetails
						vmId={selectedId}
						onUpdate={(vm) => handlePatchVM(vm.id, vm)}
						onDelete={handleDeleteVM}
						onConnect={() => setView("ssh")}
						onStatusChange={(status) => handleStatusChange(selectedId, status)}
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
				return selectedId ? (
					<SSHTerminal vmId={selectedId} onClose={() => setView("details")} />
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
					<AlertModalProvider>{renderContent()}</AlertModalProvider>
				</main>
			</div>
		</div>
	)
}
