export interface ToggleSetting {
  label: string
  description?: string
  icon: string
  enabled: boolean
}

export const GENERAL_SETTINGS: ToggleSetting[] = [
  {
    label: 'اجرای خودکار با ویندوز',
    icon: 'i-lucide-power',
    enabled: true
  },
  {
    label: 'اجرا در پس‌زمینه',
    icon: 'i-lucide-app-window',
    enabled: true
  },  {
    label: 'اعلانات دسکتاپ',
    icon: 'i-lucide-bell-ring',
    enabled: true
  },
  {
    label: 'هشدار ترافیک غیرعادی',
    icon: 'i-lucide-gauge',
    enabled: false
  }
]

export const MONITORING_SETTINGS: ToggleSetting[] = [
{
    label: 'ذخیره تاریخچه شبکه',
    description: 'نگهداری لاگ ارتباطات برای تحلیل بعدی.',
    icon: 'i-lucide-database',
    enabled: true
  }
]

export const APP_INFO = [
  { label: 'نسخه', value: '0.0.1' },
  { label: 'توسعه دهنده:', value: 'محمد جواد فخرائی' },
  { label: 'ران تایم', value: 'Node.js ۲۲' },
  { label: 'سیستم عامل', value: 'Windows' },
]
