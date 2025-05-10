// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCrudApiHandler } from "@/lib/query/next-crud-api"

export const mockData: {
	id: string
	account_id: string
	network_id: string
	os_id: string
	arch_id: string
	name: string
	status: string
	os?: string
	cpu: number
	ram: number
	storage: number
	createdAt: string
}[] = [
	{
		id: "vm-1",
		account_id: "acc-1",
		network_id: "net-1",
		os_id: "os-1",
		arch_id: "arch-1",
		name: "Production Server",
		status: "running",
		cpu: 4,
		ram: 8,
		storage: 100,
		createdAt: "2023-10-15",
	},
	{
		id: "vm-2",
		account_id: "acc-1",
		network_id: "net-1",
		os_id: "os-1",
		arch_id: "arch-1",
		name: "Development Server",
		status: "running",
		os: "Debian 11",
		cpu: 2,
		ram: 4,
		storage: 50,
		createdAt: "2023-11-20",
	},
	{
		id: "vm-3",
		account_id: "acc-1",
		network_id: "net-1",
		os_id: "os-1",
		arch_id: "arch-1",
		name: "Test Environment",
		status: "stopped",
		os: "CentOS 8",
		cpu: 2,
		ram: 4,
		storage: 40,
		createdAt: "2024-01-05",
	},
]

export default createCrudApiHandler({
	mockData,
	methods: {
		create: true,
		list: true,
	},
})
