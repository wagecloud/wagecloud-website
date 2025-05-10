"use client"

import { useState } from "react"
import type { VM } from "@/components/vm/vm-dashboard"
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
	Network,
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

interface VMDetailsProps {
	vm: VM
	onUpdate: (vm: VM) => void
	onDelete: (id: string) => void
	onConnect: () => void
	onStatusChange: (status: "running" | "stopped" | "restarting") => void
	onBack?: () => void
}

export function VMDetails({
	vm,
	onUpdate,
	onDelete,
	onConnect,
	onStatusChange,
	onBack,
}: VMDetailsProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [editedVM, setEditedVM] = useState<VM>(vm)

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
							onClick={() => onStatusChange("running")}
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
							onClick={() => onStatusChange("stopped")}
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
						<TabsTrigger value="network">Network</TabsTrigger>
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
										value={editedVM.os}
										onValueChange={(value) => handleInputChange("os", value)}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select OS" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Ubuntu 22.04 LTS">
												Ubuntu 22.04 LTS
											</SelectItem>
											<SelectItem value="Ubuntu 20.04 LTS">
												Ubuntu 20.04 LTS
											</SelectItem>
											<SelectItem value="Debian 11">Debian 11</SelectItem>
											<SelectItem value="CentOS 8">CentOS 8</SelectItem>
											<SelectItem value="Windows Server 2022">
												Windows Server 2022
											</SelectItem>
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
										<span className="text-sm">{vm.os}</span>
									</div>
									<div className="flex items-center gap-2">
										<Calendar className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm font-medium">Created:</span>
										<span className="text-sm">{vm.createdAt}</span>
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
									<Label htmlFor="memory">Memory (GB)</Label>
									<Select
										value={editedVM.memory.toString()}
										onValueChange={(value) =>
											handleInputChange("memory", Number.parseInt(value))
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
										<span className="text-sm">{vm.memory} GB</span>
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
					<TabsContent value="network">
						{isEditing ? (
							<div className="space-y-4">
								<div className="grid gap-2">
									<Label htmlFor="ip">IP Address</Label>
									<Input
										id="ip"
										value={editedVM.ip}
										onChange={(e) => handleInputChange("ip", e.target.value)}
									/>
								</div>
							</div>
						) : (
							<div className="space-y-4">
								<div className="grid grid-cols-1 gap-4">
									<div className="flex items-center gap-2">
										<Network className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm font-medium">IP Address:</span>
										<span className="text-sm">{vm.ip}</span>
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
						<Button onClick={() => setIsEditing(true)}>Edit VM</Button>
					)}
				</div>
			</CardFooter>
		</Card>
	)
}
