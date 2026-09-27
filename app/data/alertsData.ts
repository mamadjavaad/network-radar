export interface AlertRecord {
  id: number
  title: string
  description: string
  source: string
  time: string
  severity: 'high' | 'medium' | 'low'
  icon: string
}
