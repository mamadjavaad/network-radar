export interface ConnectionRecord {
  id: number
  process: string
  pid: string
  protocol: 'TCP' | 'UDP'
  localAddress: string
  remoteAddress: string
  location: string
  status: 'برقرار' | 'در حال گوش دادن' | 'در انتظار'
  traffic: string
  suspicious?: boolean
  direction?: 'آپلود' | 'دانلود' | '—'
}
