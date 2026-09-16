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
