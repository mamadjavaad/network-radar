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

export const CONNECTIONS: ConnectionRecord[] = [
  {
    id: 1,
    process: 'chrome.exe',
    pid: '4821',
    protocol: 'TCP',
    localAddress: '192.168.1.10:52314',
    remoteAddress: '142.250.185.78:443',
    location: 'آمریکا',
    status: 'برقرار',
    traffic: '842 MB'
  },
  {
    id: 2,
    process: 'unknown.exe',
    pid: '883',
    protocol: 'TCP',
    localAddress: '192.168.1.10:49777',
    remoteAddress: '45.33.32.156:6667',
    location: 'هلند',
    status: 'برقرار',
    traffic: '248 MB',
    suspicious: true
  },
  {
    id: 3,
    process: 'steam.exe',
    pid: '9216',
    protocol: 'TCP',
    localAddress: '192.168.1.10:49220',
    remoteAddress: '155.133.248.34:27036',
    location: 'سوئد',
    status: 'برقرار',
    traffic: '558 MB'
  },
  {
    id: 4,
    process: 'discord.exe',
    pid: '7744',
    protocol: 'UDP',
    localAddress: '192.168.1.10:50012',
    remoteAddress: '162.159.128.233:50000',
    location: 'آمریکا',
    status: 'برقرار',
    traffic: '312 MB'
  },
  {
    id: 5,
    process: 'node.exe',
    pid: '5120',
    protocol: 'TCP',
    localAddress: '0.0.0.0:3000',
    remoteAddress: '—',
    location: 'محلی',
    status: 'در حال گوش دادن',
    traffic: '—'
  },
  {
    id: 6,
    process: 'svchost.exe',
    pid: '1208',
    protocol: 'UDP',
    localAddress: '192.168.1.10:5353',
    remoteAddress: '224.0.0.251:5353',
    location: 'محلی',
    status: 'برقرار',
    traffic: '96 MB'
  },
  {
    id: 7,
    process: 'explorer.exe',
    pid: '3344',
    protocol: 'TCP',
    localAddress: '192.168.1.10:50120',
    remoteAddress: '20.42.65.92:443',
    location: 'آمریکا',
    status: 'در انتظار',
    traffic: '12 MB'
  }
]
