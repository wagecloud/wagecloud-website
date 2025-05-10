export type VM = {
	id: string
	account_id: string
	network_id: string
	os_id: string
	arch_id: string
	name: string
	status: "running" | "stopped" | "restarting"
	cpu: number
	ram: number
	storage: number
	createdAt: string
}
