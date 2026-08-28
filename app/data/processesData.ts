export type ProcessStatus = 'normal' | 'Average' | 'heavy'

export interface ProcessRecord {
  id: number
  name: string
  pid: string
  download: string
  upload: string
  connections: string
  usage: number
  status: ProcessStatus
}

export const PROCESSES: ProcessRecord[] = [
  {
    id: 1,
    name: 'chrome.exe',
    pid: '4821',
    download: '842 MB',
    upload: '124 MB',
    connections: '14',
    usage: 78,
    status: 'normal'
  },
  {
    id: 2,
    name: 'steam.exe',
    pid: '9216',
    download: '558 MB',
    upload: '210 MB',
    connections: '۸',
    usage: 64,
    status: 'Average'
  },
  {
    id: 3,
    name: 'discord.exe',
    pid: '7744',
    download: '248 MB',
    upload: '64 MB',
    connections: '۶',
    usage: 41,
    status: 'normal'
  },
  {
    id: 4,
    name: 'unknown.exe',
    pid: '883',
    download: '32 MB',
    upload: '248 MB',
    connections: '۳',
    usage: 92,
    status: 'heavy'
  },
  {
    id: 5,
    name: 'svchost.exe',
    pid: '1208',
    download: '72 MB',
    upload: '24 MB',
    connections: '12',
    usage: 27,
    status: 'normal'
  },
  {
    id: 6,
    name: 'node.exe',
    pid: '5120',
    download: '18 MB',
    upload: '9 MB',
    connections: '۲',
    usage: 12,
    status: 'normal'
  }
]
