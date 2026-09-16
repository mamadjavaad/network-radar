export function useApi() {
  const config = useRuntimeConfig()

  function apiFetch<T>(path: string, opts?: Record<string, unknown>) {
    return $fetch<T>(`${config.public.apiBase}${path}`, opts)
  }

  return { apiFetch }
}
