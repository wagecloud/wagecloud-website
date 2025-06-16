import { SuccessPaginationRes, SuccessResponse, TErrorResponse } from './response.type'

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api'

const headers: HeadersInit = {
  'Content-Type': 'application/json',
}

if (process.env.NODE_ENV === 'development') {
  headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
}

async function customFetch<TResponse = any>(
  url: string,
  options: RequestInit = {},
) {
  const resolvedUrl = resolveUrl(baseUrl, url)
  const response = await fetch(resolvedUrl, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  })

  if (!response.ok) {
    const res = (await response.json()) as TErrorResponse
    throw new Error(res.error.message)
  }

  return response.json() as Promise<TResponse>
}

export async function customFetchStandard<Data = any>(
  url: string,
  options: RequestInit = {},
) {
  const response = await customFetch<SuccessResponse<Data>>(url, options)
  return response.data
}

export async function customFetchPagination<Data = any>(
  url: string,
  options: RequestInit = {},
) {
  return customFetch<SuccessPaginationRes<Data>>(url, options)
}

// Helper function to resolve URLs
function resolveUrl(base: string, path: string): string {
  return new URL(path, base).toString()
}
