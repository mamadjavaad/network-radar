import type { ConnectionRecord } from '~/data/connectionsData'

interface ApiConnection {
  pid: number
  processName: string
  protocol: 'TCP' | 'UDP'
  localAddress: string
  localPort: number
  remoteAddress: string | null
  remotePort: number | null
  stateName: string
  bytesSent: number
  bytesRecv: number
}

interface ApiConnectionsResponse {
  connections: ApiConnection[]
  lastUpdate: string
  count: number
}

const STATUS_MAP: Record<string, ConnectionRecord['status']> = {
  ESTABLISHED: 'برقرار',
  LISTEN: 'در حال گوش دادن',
  SYN_SENT: 'در انتظار',
  SYN_RCVD: 'در انتظار',
  FIN_WAIT1: 'در انتظار',
  FIN_WAIT2: 'در انتظار',
  CLOSE_WAIT: 'در انتظار',
  CLOSING: 'در انتظار',
  LAST_ACK: 'در انتظار',
  TIME_WAIT: 'در انتظار',
  BOUND: 'در انتظار'
}

function formatBytes(n: number): string {
  if (!n) return '—'
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}

function getDirection(c: ApiConnection): ConnectionRecord['direction'] {
  if (!c.bytesSent && !c.bytesRecv) return '—'
  return c.bytesSent > c.bytesRecv ? 'آپلود' : 'دانلود'
}

function mapConnection(c: ApiConnection): ConnectionRecord {
  return {
    id: c.pid * 100000 + c.localPort, 
    process: c.processName,
    pid: String(c.pid),
    protocol: c.protocol,
    localAddress: `${c.localAddress}:${c.localPort}`,
    remoteAddress: c.remoteAddress ? `${c.remoteAddress}:${c.remotePort}` : '—',
    location: '—', 
    status: STATUS_MAP[c.stateName] ?? 'در انتظار',
    traffic: formatBytes(c.bytesSent + c.bytesRecv),
    direction: getDirection(c)
  }
}

export function useConnections(intervalMs = 2000) {
  const { apiFetch } = useApi()
  const connections = ref<ConnectionRecord[]>([])
  const lastUpdated = ref<string>('')
  const error = ref<string | null>(null)
  let timer: ReturnType<typeof setInterval> | null = null

  async function fetchOnce() {
    try {
      const res = await apiFetch<ApiConnectionsResponse>('/api/connections')
      connections.value = res.connections.map(mapConnection)
      lastUpdated.value = new Date().toLocaleTimeString('fa-IR')
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

  return { connections, lastUpdated, error, refresh: fetchOnce }
}
