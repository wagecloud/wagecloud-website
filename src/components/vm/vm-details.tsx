"use client"

import { useEffect, useState } from "react"
import type { PatchVM, VM } from "@/core/vm/vm.type"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
	Play,
	Square,
	RefreshCw,
	Terminal,
	Trash2,
	HardDrive,
	Cpu,
	MemoryStickIcon as Memory,
	Calendar,
	Server,
	ArrowLeft,
} from "lucide-react"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { usePatchVM, useReadVM, useStartVM, useStopVM } from "@/core/vm/vm.query"
import { useListOS } from "@/core/os/os.query"
import { useReadOS } from "@/core/os/os.query"
import { useListArch, useReadArch } from "@/core/arch/arch.query"

interface VMDetailsProps {
	vmId: string
	onUpdate: (vm: VM) => void
	onDelete: (id: string) => void
	onConnect: () => void
	onStatusChange: (status: "running" | "stopped" | "restarting") => void
	onBack: () => void
}

export function VMDetails({
	vmId,
	onUpdate,
	onDelete,
	onConnect,
	onStatusChange,
	onBack,
}: VMDetailsProps) {
	const [isEditing, setIsEditing] = useState(false)
	const { data: vm, refetch: refetchVM } = useReadVM(vmId)
	const [editedVM, setEditedVM] = useState<PatchVM>(vm!)
	const { data: os } = useReadOS(vm?.os_id)
	const { data: arch } = useReadArch(vm?.arch_id)
	const { data: oss } = useListOS({
    page: 1,
    limit: 100,
  })
	const { data: arches } = useListArch({
    page: 1,
    limit: 100,
  })
  const {mutateAsync: mutatePatchVM} = usePatchVM()
  const {mutateAsync: mutateStartVM} = useStartVM()
  const {mutateAsync: mutateStopVM} = useStopVM()

  useEffect(() => {
    if (vm) {
      setEditedVM(vm)
    }
  }, [vm])

  useEffect(() => {
    const interval = setInterval(() => {
      refetchVM()
    }, 3000)
    return () => clearInterval(interval)
  }, [])

	if (!vm) {
		return <div>VM not found</div>
	}

  
	const getStatusColor = (status: string) => {
		switch (status) {
			case "running":
				return "bg-green-500 hover:bg-green-600"
			case "stopped":
				return "bg-red-500 hover:bg-red-600"
			case "restarting":
				return "bg-yellow-500 hover:bg-yellow-600"
			default:
				return "bg-gray-500 hover:bg-gray-600"
		}
	}

	const handleInputChange = (field: keyof VM, value: any) => {
		setEditedVM({ ...editedVM, [field]: value })
	}

	const handleSave = () => {
    // Create a patch object with only changed fields
    const patch: Partial<PatchVM> = {}
    Object.keys(editedVM).forEach((key) => {
      const typedKey = key as keyof PatchVM
      if (editedVM[typedKey] !== vm[typedKey]) {
        patch[typedKey] = editedVM[typedKey]
      }
    })

    mutatePatchVM({
      id: vm.id,
      patch
    })
		onUpdate(editedVM)
		setIsEditing(false)
	}

	const handleCancel = () => {
		setEditedVM(vm)
		setIsEditing(false)
	}

	return (
		<Card className="max-w-4xl mx-auto">
			<CardHeader className="flex flex-row items-center justify-between">
				<div>
					<CardTitle className="text-2xl">{vm.name}</CardTitle>
					<div className="flex items-center gap-2 mt-1">
						<div
							className={`h-2 w-2 rounded-full ${
								getStatusColor(vm.status).split(" ")[0]
							}`}
						/>
						<span className="text-sm capitalize">{vm.status}</span>
					</div>
				</div>
				<div className="flex gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={onBack}
						className="flex items-center gap-1"
					>
						<ArrowLeft className="h-4 w-4" />
						Back
					</Button>
					{vm.status !== "running" && (
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
                onStatusChange("running")
                mutateStartVM(vm.id)
              }}
							className="flex items-center gap-1"
						>
							<Play className="h-4 w-4" />
							Start
						</Button>
					)}
					{vm.status !== "stopped" && (
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
                onStatusChange("stopped")
                mutateStopVM(vm.id)
              }}
							className="flex items-center gap-1"
						>
							<Square className="h-4 w-4" />
							Stop
						</Button>
					)}
					{vm.status !== "restarting" && (
						<Button
							variant="outline"
							size="sm"
							onClick={() => onStatusChange("restarting")}
							className="flex items-center gap-1"
              disabled
						>
							<RefreshCw className="h-4 w-4" />
							Restart
						</Button>
					)}
					{vm.status === "running" && (
						<Button
							variant="default"
							size="sm"
							onClick={onConnect}
							className="flex items-center gap-1"
						>
							<Terminal className="h-4 w-4" />
							SSH Connect
						</Button>
					)}
				</div>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="details">
					<TabsList className="mb-4">
						<TabsTrigger value="details">Details</TabsTrigger>
						<TabsTrigger value="resources">Resources</TabsTrigger>
					</TabsList>
					<TabsContent value="details">
						{isEditing ? (
							<div className="space-y-4">
								<div className="grid gap-2">
									<Label htmlFor="name">VM Name</Label>
									<Input
										id="name"
										value={editedVM.name}
										onChange={(e) => handleInputChange("name", e.target.value)}
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="os">Operating System</Label>
									<Select
										value={editedVM.os_id}
										onValueChange={(value) => handleInputChange("os_id", value)}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select OS" />
										</SelectTrigger>
										<SelectContent>
											{oss?.map((os) => (
												<SelectItem key={os.id} value={os.id}>
													{os.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>
						) : (
							<div className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div className="flex items-center gap-2">
										<Server className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm font-medium">
											Operating System:
										</span>
										<span className="text-sm">
											{os?.name} {arch?.name}
										</span>
									</div>
									<div className="flex items-center gap-2">
										<Calendar className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm font-medium">Created:</span>
										<span className="text-sm">
											{new Date(vm.created_at).toLocaleString()}
										</span>
									</div>
								</div>
							</div>
						)}
					</TabsContent>
					<TabsContent value="resources">
						{isEditing ? (
							<div className="space-y-4">
								<div className="grid gap-2">
									<Label htmlFor="cpu">CPU Cores</Label>
									<Select
										value={editedVM.cpu.toString()}
										onValueChange={(value) =>
											handleInputChange("cpu", Number.parseInt(value))
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select CPU cores" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1">1 Core</SelectItem>
											<SelectItem value="2">2 Cores</SelectItem>
											<SelectItem value="4">4 Cores</SelectItem>
											<SelectItem value="8">8 Cores</SelectItem>
											<SelectItem value="16">16 Cores</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="ram">Memory (GB)</Label>
									<Select
										value={editedVM.ram.toString()}
										onValueChange={(value) =>
											handleInputChange("ram", Number.parseInt(value))
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select memory" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1">1 GB</SelectItem>
											<SelectItem value="2">2 GB</SelectItem>
											<SelectItem value="4">4 GB</SelectItem>
											<SelectItem value="8">8 GB</SelectItem>
											<SelectItem value="16">16 GB</SelectItem>
											<SelectItem value="32">32 GB</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="storage">Storage (GB)</Label>
									<Select
										value={editedVM.storage.toString()}
										onValueChange={(value) =>
											handleInputChange("storage", Number.parseInt(value))
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select storage" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="20">20 GB</SelectItem>
											<SelectItem value="40">40 GB</SelectItem>
											<SelectItem value="50">50 GB</SelectItem>
											<SelectItem value="100">100 GB</SelectItem>
											<SelectItem value="200">200 GB</SelectItem>
											<SelectItem value="500">500 GB</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						) : (
							<div className="space-y-4">
								<div className="grid grid-cols-1 gap-4">
									<div className="flex items-center gap-2">
										<Cpu className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm font-medium">CPU:</span>
										<span className="text-sm">{vm.cpu} cores</span>
									</div>
									<div className="flex items-center gap-2">
										<Memory className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm font-medium">Memory:</span>
										<span className="text-sm">{Math.floor(vm.ram / 1024)} GB</span>
									</div>
									<div className="flex items-center gap-2">
										<HardDrive className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm font-medium">Storage:</span>
										<span className="text-sm">{vm.storage} GB</span>
									</div>
								</div>
							</div>
						)}
					</TabsContent>
				</Tabs>
			</CardContent>
			<CardFooter className="flex justify-between border-t p-6">
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="destructive" className="flex items-center gap-1">
							<Trash2 className="h-4 w-4" />
							Delete VM
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete the
								virtual machine and all associated data.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => onDelete(vm.id)}
								className="bg-destructive text-destructive-foreground"
							>
								Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>

				<div className="flex gap-2">
					{isEditing ? (
						<>
							<Button variant="outline" onClick={handleCancel}>
								Cancel
							</Button>
							<Button onClick={handleSave}>Save Changes</Button>
						</>
					) : (
						<Button disabled onClick={() => setIsEditing(true)}>Edit VM</Button>
					)}
				</div>
			</CardFooter>
		</Card>
	)
}
