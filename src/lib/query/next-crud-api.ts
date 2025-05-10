import type { NextApiRequest, NextApiResponse } from "next"
import { SuccessRes, SuccessPaginationRes } from "@/core/response/response.type"

type MockItem = Record<string, any>

interface CrudApiOptions {
	mockData: MockItem[]
	idField?: string // Field to use as the unique identifier (default: 'id')
	methods?: {
		create?: boolean // Enable POST method
		read?: boolean // Enable GET method for single item
		list?: boolean // Enable GET method for listing items
		update?: boolean // Enable PATCH method
		delete?: boolean // Enable DELETE method
	}
	getIdFromRequest?: (req: NextApiRequest) => string | undefined // Custom function to extract ID from request
}

export function createCrudApiHandler(options: CrudApiOptions) {
	const {
		mockData,
		idField = "id",
		methods = {
			create: true,
			read: true,
			list: true,
			update: true,
			delete: true,
		},
		getIdFromRequest = (req: NextApiRequest) => req.query[idField] as string,
	} = options
	const data = [...mockData] // Create a copy to allow modifications

	return async function handler(req: NextApiRequest, res: NextApiResponse) {
		try {
			switch (req.method) {
				case "POST": {
					if (!methods.create) {
						return res
							.status(405)
							.json({ success: false, message: "Method not allowed" })
					}
					// Create
					const body = req.body as Record<string, any>
					const newItem = {
						...body,
						[idField]: generateUniqueId(data, idField),
					}
					data.push(newItem)
					const response: SuccessRes<MockItem> = {
						success: true,
						data: newItem,
					}
					return res.status(201).json(response)
				}

				case "GET": {
					const id = getIdFromRequest(req)
					if (id) {
						if (!methods.read) {
							return res
								.status(405)
								.json({ success: false, message: "Method not allowed" })
						}
						// Read
						const item = data.find((item) => item[idField] === id)
						if (!item) {
							return res
								.status(404)
								.json({ success: false, message: "Item not found" })
						}
						const response: SuccessRes<MockItem> = { success: true, data: item }
						return res.status(200).json(response)
					} else {
						if (!methods.list) {
							return res
								.status(405)
								.json({ success: false, message: "Method not allowed" })
						}
						// List
						const { page = "1", limit = "10", ...filters } = req.query
						const pageNum = parseInt(page as string, 10)
						const limitNum = parseInt(limit as string, 10)
						let filteredData = [...data]

						// Apply filters
						for (const [key, value] of Object.entries(filters)) {
							filteredData = filteredData.filter((item) =>
								String(item[key])
									.toLowerCase()
									.includes(String(value).toLowerCase())
							)
						}

						const total = filteredData.length
						const start = (pageNum - 1) * limitNum
						const paginatedData = filteredData.slice(start, start + limitNum)

						const response: SuccessPaginationRes<MockItem> = {
							success: true,
							data: paginatedData,
							pagination: {
								total,
								page: pageNum,
								limit: limitNum,
							},
						}
						return res.status(200).json(response)
					}
				}

				case "PATCH": {
					if (!methods.update) {
						return res
							.status(405)
							.json({ success: false, message: "Method not allowed" })
					}
					// Patch
					const id = getIdFromRequest(req)
					if (!id) {
						return res
							.status(400)
							.json({ success: false, message: "ID is required" })
					}
					const patch = req.body as Partial<MockItem>
					const index = data.findIndex((item) => item[idField] === id)
					if (index === -1) {
						return res
							.status(404)
							.json({ success: false, message: "Item not found" })
					}
					data[index] = { ...data[index], ...patch }
					const response: SuccessRes<MockItem> = {
						success: true,
						data: data[index],
					}
					return res.status(200).json(response)
				}

				case "DELETE": {
					if (!methods.delete) {
						return res
							.status(405)
							.json({ success: false, message: "Method not allowed" })
					}
					// Delete
					const id = getIdFromRequest(req)
					if (!id) {
						return res
							.status(400)
							.json({ success: false, message: "ID is required" })
					}
					const index = data.findIndex((item) => item[idField] === id)
					if (index === -1) {
						return res
							.status(404)
							.json({ success: false, message: "Item not found" })
					}
					const deletedItem = data.splice(index, 1)[0]
					const response: SuccessRes<MockItem> = {
						success: true,
						data: deletedItem,
					}
					return res.status(200).json(response)
				}

				default: {
					return res
						.status(405)
						.json({ success: false, message: "Method not allowed" })
				}
			}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: "Internal server error" })
		}
	}
}

// Helper to generate a unique ID
function generateUniqueId(data: MockItem[], idField: string): string {
	const existingIds = new Set(data.map((item) => item[idField]))
	let newId: string
	do {
		newId = Math.random().toString(36).substring(2, 10)
	} while (existingIds.has(newId))
	return newId
}
