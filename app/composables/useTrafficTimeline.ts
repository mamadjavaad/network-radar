export interface TimelineBucket {
  bucket: string 
  sent: number
  recv: number
}

interface ApiTimelineResponse {
  buckets: TimelineBucket[]
  count: number
  minutes: number
}

export function useTrafficTimeline(minutes = 30, intervalMs = 10000) {
  const { apiFetch } = useApi()
  const buckets = ref<TimelineBucket[]>([])
  const error = ref<string | null>(null)
  let timer: ReturnType<typeof setInterval> | null = null

  async function fetchOnce() {
    try {
      const res = await apiFetch<ApiTimelineResponse>(`/api/history/timeline?minutes=${minutes}`)
      buckets.value = res.buckets
      error.value = null
    } catch {
      error.value = 'اتصال به سرور برقرار نشد'
    }
  }

  onMounted(() => {
    fetchOnce()
    timer = setInterval(fetchOnce, intervalMs)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return { buckets, error, refresh: fetchOnce }
}
