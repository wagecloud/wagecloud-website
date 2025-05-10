"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import type { VM } from "@/components/vm/vm-dashboard"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { X } from "lucide-react"

interface SSHTerminalProps {
	vm: VM
	onClose: () => void
}

export function SSHTerminal({ vm, onClose }: SSHTerminalProps) {
	const [command, setCommand] = useState("")
	const [history, setHistory] = useState<string[]>([
		`Connected to ${vm.name} (${vm.ip})`,
		`${vm.os} LTS`,
		"Last login: Sat May 10 09:31:11 2025 from 192.168.1.5",
		"",
	])
	const [commandHistory, setCommandHistory] = useState<string[]>([])
	const [historyIndex, setHistoryIndex] = useState(-1)
	const terminalRef = useRef<HTMLDivElement>(null)

	const handleCommand = (e: React.FormEvent) => {
		e.preventDefault()

		if (!command.trim()) return

		// Add command to history
		const newHistory = [...history, `user@${vm.name}:~$ ${command}`]

		// Process command
		switch (command.toLowerCase()) {
			case "help":
				newHistory.push(
					"Available commands:",
					"  ls - List files",
					"  pwd - Print working directory",
					"  whoami - Display current user",
					"  uname -a - Display system information",
					"  df -h - Show disk usage",
					"  free -m - Show memory usage",
					"  clear - Clear the terminal",
					"  exit - Close SSH connection",
					""
				)
				break
			case "ls":
				newHistory.push(
					"Documents  Downloads  Pictures  Videos  app.js  server.conf",
					""
				)
				break
			case "pwd":
				newHistory.push("/home/user", "")
				break
			case "whoami":
				newHistory.push("user", "")
				break
			case "uname -a":
				newHistory.push(`Linux ${vm.name} 5.15.0-1019-aws x86_64 GNU/Linux`, "")
				break
			case "df -h":
				newHistory.push(
					"Filesystem      Size  Used Avail Use% Mounted on",
					`/dev/sda1       ${vm.storage}G   ${Math.floor(
						vm.storage * 0.3
					)}G   ${Math.floor(vm.storage * 0.7)}G  ${Math.floor(
						((vm.storage * 0.3) / vm.storage) * 100
					)}% /`,
					""
				)
				break
			case "free -m":
				newHistory.push(
					"              total        used        free      shared  buff/cache   available",
					`Mem:           ${vm.memory * 1024}         ${Math.floor(
						vm.memory * 1024 * 0.4
					)}       ${Math.floor(
						vm.memory * 1024 * 0.6
					)}           0        ${Math.floor(
						vm.memory * 1024 * 0.2
					)}        ${Math.floor(vm.memory * 1024 * 0.5)}`,
					`Swap:          ${vm.memory * 512}           0       ${
						vm.memory * 512
					}`,
					""
				)
				break
			case "clear":
				setHistory([""])
				setCommand("")
				return
			case "exit":
				onClose()
				return
			default:
				if (command.startsWith("cd ")) {
					newHistory.push("")
				} else {
					newHistory.push(`Command not found: ${command}`, "")
				}
		}

		setHistory(newHistory)
		setCommandHistory((prev) => [...prev, command])
		setCommand("")
		setHistoryIndex(-1)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "ArrowUp") {
			e.preventDefault()
			if (historyIndex < commandHistory.length - 1) {
				const newIndex = historyIndex + 1
				setHistoryIndex(newIndex)
				setCommand(commandHistory[commandHistory.length - 1 - newIndex])
			}
		} else if (e.key === "ArrowDown") {
			e.preventDefault()
			if (historyIndex > 0) {
				const newIndex = historyIndex - 1
				setHistoryIndex(newIndex)
				setCommand(commandHistory[commandHistory.length - 1 - newIndex])
			} else if (historyIndex === 0) {
				setHistoryIndex(-1)
				setCommand("")
			}
		}
	}

	// Auto-scroll to bottom when history changes
	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight
		}
	}, [history])

	return (
		<Card className="max-w-4xl mx-auto">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="flex items-center gap-2">
					<span>SSH Connection: {vm.name}</span>
					<span className="text-sm text-muted-foreground">({vm.ip})</span>
				</CardTitle>
				<Button variant="ghost" size="icon" onClick={onClose}>
					<X className="h-4 w-4" />
				</Button>
			</CardHeader>
			<CardContent>
				<div
					className="bg-black text-green-500 font-mono p-4 rounded-md h-[400px] overflow-y-auto"
					ref={terminalRef}
				>
					{history.map((line, i) => (
						<div key={i} className="whitespace-pre-wrap">
							{line}
						</div>
					))}
					<form onSubmit={handleCommand} className="flex items-center">
						<span className="mr-2">user@{vm.name}:~$</span>
						<input
							type="text"
							value={command}
							onChange={(e) => setCommand(e.target.value)}
							onKeyDown={handleKeyDown}
							className="bg-transparent border-none outline-none flex-1 text-green-500 font-mono"
							autoFocus
						/>
					</form>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between border-t p-6">
				<div className="text-sm text-muted-foreground">
					Type <code className="bg-muted px-1 py-0.5 rounded">help</code> for
					available commands
				</div>
				<Button variant="outline" onClick={onClose}>
					Close Connection
				</Button>
			</CardFooter>
		</Card>
	)
}
