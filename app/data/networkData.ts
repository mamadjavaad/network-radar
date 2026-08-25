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

export const NETWORK_STATS: StatItem[] = [
  {
    label: 'ترافیک شبکه',
    value: '۱.۸۲ GB',
    change: '+۱۲.۴٪',
    description: 'مجموع ترافیک امروز',
    icon: 'i-lucide-activity'
  },
  {
    label: 'دریافت',
    value: '۱.۴۶ GB',
    change: '+۸.۷٪',
    description: 'حجم داده دریافتی',
    icon: 'i-lucide-arrow-down'
  },
  {
    label: 'ارسال',
    value: '۳۶۴ MB',
    change: '+۲۱.۲٪',
    description: 'حجم داده ارسالی',
    icon: 'i-lucide-arrow-up'
  },
  {
    label: 'ارتباطات فعال',
    value: '۲۴',
    change: '+۳',
    description: 'ارتباطات فعال فعلی',
    icon: 'i-lucide-network'
  }
]

export const NETWORK_ALERTS: AlertItem[] = [
  {
    title: 'ترافیک خروجی غیرعادی',
    description: 'unknown.exe طی ۴ دقیقه، ۲۴۸ مگابایت داده ارسال کرده است.',
    time: '۲ دقیقه پیش',
    severity: 'high',
    icon: 'i-lucide-shield-alert'
  },
  {
    title: 'مقصد جدید شناسایی شد',
    description: 'chrome.exe به یک IP خارجی جدید متصل شده است.',
    time: '۸ دقیقه پیش',
    severity: 'medium',
    icon: 'i-lucide-globe-2'
  },
  {
    title: 'افزایش ناگهانی ارتباطات',
    description: '۴۲ ارتباط جدید طی ۱۰ ثانیه شناسایی شده است.',
    time: '۲۱ دقیقه پیش',
    severity: 'medium',
    icon: 'i-lucide-zap'
  }
]

export const TOP_PROCESSES: TopProcessItem[] = [
  { name: 'chrome.exe', value: 78, traffic: '842 MB' },
  { name: 'steam.exe', value: 64, traffic: '558 MB' },
  { name: 'discord.exe', value: 41, traffic: '312 MB' },
  { name: 'svchost.exe', value: 27, traffic: '96 MB' }
]

