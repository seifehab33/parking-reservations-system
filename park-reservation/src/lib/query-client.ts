import { QueryClient } from "@tanstack/react-query";

let client: QueryClient | null = null;

export function getQueryClient() {
  if (!client) {
    client = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1,
          staleTime: 1000 * 60 * 1,
          gcTime: 1000 * 60 * 5,
        },
        mutations: {
          retry: 1,
        },
      },
    });
  }
  return client;
}
