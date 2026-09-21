export interface ApiAlert {
  id: number
  type: string
  severity: 'low' | 'medium' | 'high'
  pid: number | null
  process_name: string | null
  title: string
  description: string
  created_at: string
  acknowledged: number
}

interface ApiAlertsResponse {
  alerts: ApiAlert[]
  count: number
}

export function useAlerts(intervalMs = 5000, limit = 20) {
  const { apiFetch } = useApi()
  const alerts = ref<ApiAlert[]>([])
  const error = ref<string | null>(null)
  let timer: ReturnType<typeof setInterval> | null = null

  async function fetchOnce() {
    try {
      const res = await apiFetch<ApiAlertsResponse>(`/api/alerts?limit=${limit}`)
      alerts.value = res.alerts
      error.value = null
    } catch {
      error.value = 'اتصال به سرور برقرار نشد'
    }
  }

  async function acknowledge(id: number) {
    try {
      await apiFetch(`/api/alerts/${id}/acknowledge`, { method: 'POST' })
      alerts.value = alerts.value.map(a => (a.id === id ? { ...a, acknowledged: 1 } : a))
    } catch {
      // silent — next poll will reconcile the real state anyway
    }
  }

  onMounted(() => {
    fetchOnce()
    timer = setInterval(fetchOnce, intervalMs)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return { alerts, error, refresh: fetchOnce, acknowledge }
}
