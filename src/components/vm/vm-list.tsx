"use client"

import type { VM } from "@/components/vm/vm-dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {
	Play,
	Square,
	RefreshCw,
	Terminal,
	PlusCircle,
	Search,
	Server,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { VMStatusCard } from "@/components/vm/vm-status-card"

interface VMListProps {
	vms: VM[]
	onSelect: (vm: VM) => void
	onStatusChange: (
		id: string,
		status: "running" | "stopped" | "restarting"
	) => void
	showDashboard?: boolean
}

export function VMList({
	vms,
	onSelect,
	onStatusChange,
	showDashboard = false,
}: VMListProps) {
	const [searchTerm, setSearchTerm] = useState("")

	const getStatusColor = (status: string) => {
		switch (status) {
			case "running":
				return "bg-green-500"
			case "stopped":
				return "bg-red-500"
			case "restarting":
				return "bg-yellow-500"
			default:
				return "bg-gray-500"
		}
	}

	const filteredVMs = vms.filter(
		(vm) =>
			vm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			vm.os.toLowerCase().includes(searchTerm.toLowerCase()) ||
			vm.ip.includes(searchTerm)
	)

	const runningVMs = vms.filter((vm) => vm.status === "running").length
	const stoppedVMs = vms.filter((vm) => vm.status === "stopped").length
	const restartingVMs = vms.filter((vm) => vm.status === "restarting").length

	return (
		<div className="space-y-6">
			{showDashboard && (
				<>
					<div className="flex items-center justify-between">
						<h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
						<Button className="flex items-center gap-2">
							<PlusCircle className="h-4 w-4" />
							Create VM
						</Button>
					</div>

					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						<VMStatusCard
							title="Total VMs"
							value={vms.length.toString()}
							description="Total virtual machines"
							icon={<Server className="h-4 w-4 text-muted-foreground" />}
						/>
						<VMStatusCard
							title="Running"
							value={runningVMs.toString()}
							description="Active virtual machines"
							icon={<Play className="h-4 w-4 text-green-500" />}
							trend={`${Math.round((runningVMs / vms.length) * 100)}% of total`}
							trendType="positive"
						/>
						<VMStatusCard
							title="Stopped"
							value={stoppedVMs.toString()}
							description="Inactive virtual machines"
							icon={<Square className="h-4 w-4 text-red-500" />}
							trend={`${Math.round((stoppedVMs / vms.length) * 100)}% of total`}
							trendType="negative"
						/>
						<VMStatusCard
							title="Restarting"
							value={restartingVMs.toString()}
							description="VMs in transition"
							icon={<RefreshCw className="h-4 w-4 text-yellow-500" />}
							trend={`${Math.round(
								(restartingVMs / vms.length) * 100
							)}% of total`}
							trendType="warning"
						/>
					</div>
				</>
			)}

			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>
						{showDashboard ? "Recent Virtual Machines" : "Virtual Machines"}
					</CardTitle>
					<div className="relative w-64">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search VMs..."
							className="pl-8"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</CardHeader>
				<CardContent>
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className="hidden md:table-cell">OS</TableHead>
									<TableHead className="hidden md:table-cell">
										IP Address
									</TableHead>
									<TableHead className="hidden lg:table-cell">
										Resources
									</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredVMs.map((vm) => (
									<TableRow
										key={vm.id}
										className="cursor-pointer hover:bg-muted/50"
										onClick={() => onSelect(vm)}
									>
										<TableCell className="font-medium">{vm.name}</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<div
													className={`h-2 w-2 rounded-full ${getStatusColor(
														vm.status
													)}`}
												/>
												<span className="capitalize">{vm.status}</span>
											</div>
										</TableCell>
										<TableCell className="hidden md:table-cell">
											{vm.os}
										</TableCell>
										<TableCell className="hidden md:table-cell">
											{vm.ip}
										</TableCell>
										<TableCell className="hidden lg:table-cell">
											<div className="flex flex-col gap-1 text-xs">
												<div>CPU: {vm.cpu} cores</div>
												<div>RAM: {vm.memory} GB</div>
												<div>Storage: {vm.storage} GB</div>
											</div>
										</TableCell>
										<TableCell>
											<div
												className="flex items-center gap-2"
												onClick={(e) => e.stopPropagation()}
											>
												{vm.status !== "running" && (
													<Button
														variant="outline"
														size="icon"
														onClick={() => onStatusChange(vm.id, "running")}
														title="Start VM"
													>
														<Play className="h-4 w-4" />
													</Button>
												)}
												{vm.status !== "stopped" && (
													<Button
														variant="outline"
														size="icon"
														onClick={() => onStatusChange(vm.id, "stopped")}
														title="Stop VM"
													>
														<Square className="h-4 w-4" />
													</Button>
												)}
												{vm.status !== "restarting" && (
													<Button
														variant="outline"
														size="icon"
														onClick={() => onStatusChange(vm.id, "restarting")}
														title="Restart VM"
													>
														<RefreshCw className="h-4 w-4" />
													</Button>
												)}
												{vm.status === "running" && (
													<Button
														variant="outline"
														size="icon"
														onClick={(e) => {
															e.stopPropagation()
															onSelect(vm)
															// We'll handle the SSH connection in the parent component
														}}
														title="SSH Connect"
													>
														<Terminal className="h-4 w-4" />
													</Button>
												)}
											</div>
										</TableCell>
									</TableRow>
								))}
								{filteredVMs.length === 0 && (
									<TableRow>
										<TableCell
											colSpan={6}
											className="text-center py-6 text-muted-foreground"
										>
											{searchTerm
												? "No virtual machines match your search"
												: "No virtual machines found. Create one to get started."}
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
