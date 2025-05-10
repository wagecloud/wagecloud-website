import { type TErrorResponse } from "@/core/error/error.type"

// const baseUrl = "http://localhost:3000/api/"
const baseUrl = "http://khoakomlem-internal.ddns.net:8080/api/v1/"

const headers: HeadersInit = {
	"Content-Type": "application/json",
}

// if (process.env.NODE_ENV === "development") {
// headers.Authorization = `Bearer ${env.NEXT_PUBLIC_API_TEST_TOKEN}`;
headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SUQiOjEsIlJvbGUiOiIiLCJpc3MiOiJ3YWdlY2xvdWQiLCJzdWIiOiIxIiwiYXVkIjpbIndhZ2VjbG91ZCJdLCJleHAiOjE3NDY5ODU4OTAsImlhdCI6MTc0Njg5OTQ5MH0.pAEEnCjnIKiuyhnEajL4gvJf0f_U-qtocOlhG1bGXOw`
// }

// Helper function to resolve URLs
function resolveUrl(base: string, path: string): string {
	return new URL(path, base).toString()
}

export async function customFetch(
	url: string,
	options: RequestInit = {}
): Promise<Response> {
	const resolvedUrl = resolveUrl(baseUrl, url)
	const response = await fetch(resolvedUrl, {
		...options,
		headers: {
			...headers,
			...options.headers,
		},
	})
	if (!response.ok) {
		if (response.status === 500) {
			const res = (await response.json()) as TErrorResponse
			throw new Error(res.message)
		}

		throw new Error(
			`HTTP error! Status: ${response.status}, Status Text: ${response.statusText}`
		)
	}

	return response
}

export async function customFetchJson<SuccessResponse = any>(
	url: string,
	options: RequestInit = {}
): Promise<SuccessResponse> {
	const resolvedUrl = resolveUrl(baseUrl, url)
	return customFetch(resolvedUrl, options).then(async (res) =>
		res.json()
	) as Promise<SuccessResponse>
}
