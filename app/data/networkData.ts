export interface StatItem {
  label: string
  value: string
  change: string
  description: string
  icon: string
}

export interface AlertItem {
  title: string
  description: string
  time: string
  severity: 'high' | 'medium' | 'low'
  icon: string
}

export interface TopProcessItem {
  name: string
  value: number
  traffic: string
}
