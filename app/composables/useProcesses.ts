import type { ProcessRecord, ProcessStatus } from '~/data/processesData'

interface ApiProcessSummary {
  pid: number
  process_name: string
  last_seen: string
  total_sent: number
  total_recv: number
  active_connections: number
}

interface ApiProcessSummaryResponse {
  processes: ApiProcessSummary[]
}

function formatBytes(n: number): string {
  if (!n) return '—'
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}


function deriveStatus(sharePercent: number): ProcessStatus {
  if (sharePercent >= 66) return 'heavy'
  if (sharePercent >= 33) return 'Average'
  return 'normal'
}

function mapProcesses(raw: ApiProcessSummary[]): ProcessRecord[] {
  const totals = raw.map(p => p.total_sent + p.total_recv)
  const max = Math.max(1, ...totals) 

  return raw.map((p) => {
    const total = p.total_sent + p.total_recv
    const usage = Math.round((total / max) * 100)
    return {
      id: p.pid,
      name: p.process_name,
      pid: String(p.pid),
      download: formatBytes(p.total_recv),
      upload: formatBytes(p.total_sent),
      connections: String(p.active_connections),
      usage,
      status: deriveStatus(usage)
    }
  })
}

export function useProcesses(intervalMs = 2000) {
  const { apiFetch } = useApi()
  const processes = ref<ProcessRecord[]>([])
  const totalSentBytes = ref(0)
  const totalRecvBytes = ref(0)
  const error = ref<string | null>(null)
  let timer: ReturnType<typeof setInterval> | null = null

  async function fetchOnce() {
    try {
      const res = await apiFetch<ApiProcessSummaryResponse>('/api/processes/summary')
      processes.value = mapProcesses(res.processes)
      totalSentBytes.value = res.processes.reduce((sum, p) => sum + p.total_sent, 0)
      totalRecvBytes.value = res.processes.reduce((sum, p) => sum + p.total_recv, 0)
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

  return { processes, totalSentBytes, totalRecvBytes, error, refresh: fetchOnce }
}
