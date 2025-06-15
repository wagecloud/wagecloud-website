import { queryClient } from "@/core/query-client/query-client"
import "@/styles/globals.css"
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<HydrationBoundary>
				<Component {...pageProps} />
			</HydrationBoundary>
		</QueryClientProvider>
	)
}
