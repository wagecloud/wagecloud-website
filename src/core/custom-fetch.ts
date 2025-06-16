import { type TErrorResponse } from '@/core/error/error.type'

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api'

const headers: HeadersInit = {
  'Content-Type': 'application/json',
}

if (process.env.NODE_ENV === 'development') {
  headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
}

export async function customFetch(
  url: string,
  options: RequestInit = {},
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
      `HTTP error! Status: ${response.status}, Status Text: ${response.statusText}`,
    )
  }

  return response
}

export async function customFetchJson<SuccessResponse = any>(
  url: string,
  options: RequestInit = {},
): Promise<SuccessResponse> {
  const resolvedUrl = resolveUrl(baseUrl, url)
  return customFetch(resolvedUrl, options).then(async res =>
    res.json(),
  ) as Promise<SuccessResponse>
}

// Helper function to resolve URLs
function resolveUrl(base: string, path: string): string {
  return new URL(path, base).toString()
}
