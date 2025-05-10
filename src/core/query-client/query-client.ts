import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"

function handleUnAuthorized(error: any) {
	if (
		window.location.pathname != "/login" &&
		window.location.pathname != "/admin-login"
	) {
		if (window.location.pathname.includes("/admin")) {
			// location.href = "/admin-login"
		}
	}
}

function handleUnAuthorizedMutation(error: any) {
	if (
		window.location.pathname != "/login" &&
		window.location.pathname != "/admin-login"
	) {
		if (window.location.pathname.includes("/admin")) {
			// location.href = "/admin-login"
		} else {
			// location.href = "/login"
		}
	}
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			staleTime: 1000 * 60 * 5,
			refetchOnWindowFocus: true,
		},
	},
	queryCache: new QueryCache({
		onError(error) {
			handleUnAuthorized(error)
		},
	}),
	mutationCache: new MutationCache({
		onError(error) {
			handleUnAuthorizedMutation(error)
		},
	}),
})
