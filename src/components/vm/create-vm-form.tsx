"use client"

import type React from "react"

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CreateVMFormProps {
	onSubmit: (vm: Omit<VM, "id" | "createdAt">) => void
	onCancel: () => void
}

export function CreateVMForm({ onSubmit, onCancel }: CreateVMFormProps) {
	const [newVM, setNewVM] = useState<Omit<VM, "id" | "createdAt">>({
		name: "",
		status: "stopped",
		os: "Ubuntu 22.04 LTS",
		ip: "192.168.1.100",
		cpu: 2,
		memory: 4,
		storage: 50,
	})

	const handleInputChange = (
		field: keyof Omit<VM, "id" | "createdAt">,
		value: any
	) => {
		setNewVM({ ...newVM, [field]: value })
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSubmit(newVM)
	}

	return (
		<Card className="max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle>Create New Virtual Machine</CardTitle>
			</CardHeader>
			<form onSubmit={handleSubmit}>
				<CardContent>
					<Tabs defaultValue="basic">
						<TabsList className="mb-4">
							<TabsTrigger value="basic">Basic Settings</TabsTrigger>
							<TabsTrigger value="resources">Resources</TabsTrigger>
							<TabsTrigger value="network">Network</TabsTrigger>
						</TabsList>
						<TabsContent value="basic">
							<div className="space-y-4">
								<div className="grid gap-2">
									<Label htmlFor="name">VM Name</Label>
									<Input
										id="name"
										value={newVM.name}
										onChange={(e) => handleInputChange("name", e.target.value)}
										placeholder="My Virtual Machine"
										required
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="os">Operating System</Label>
									<Select
										value={newVM.os}
										onValueChange={(value) => handleInputChange("os", value)}
										required
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
						</TabsContent>
						<TabsContent value="resources">
							<div className="space-y-4">
								<div className="grid gap-2">
									<Label htmlFor="cpu">CPU Cores</Label>
									<Select
										value={newVM.cpu.toString()}
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
										value={newVM.memory.toString()}
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
										value={newVM.storage.toString()}
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
						</TabsContent>
						<TabsContent value="network">
							<div className="space-y-4">
								<div className="grid gap-2">
									<Label htmlFor="ip">IP Address</Label>
									<Input
										id="ip"
										value={newVM.ip}
										onChange={(e) => handleInputChange("ip", e.target.value)}
										placeholder="192.168.1.100"
									/>
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</CardContent>
				<CardFooter className="flex justify-between border-t p-6">
					<Button variant="outline" type="button" onClick={onCancel}>
						Cancel
					</Button>
					<Button type="submit">Create VM</Button>
				</CardFooter>
			</form>
		</Card>
	)
}
