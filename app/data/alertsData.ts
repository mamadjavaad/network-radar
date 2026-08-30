export interface AlertRecord {
  id: number
  title: string
  description: string
  source: string
  time: string
  severity: 'high' | 'medium' | 'low'
  icon: string
}

export const ALERT_RECORDS: AlertRecord[] = [
  {
    id: 1,
    title: 'ترافیک خروجی غیرعادی',
    description: 'unknown.exe طی ۴ دقیقه، ۲۴۸ مگابایت داده ارسال کرده است.',
    source: 'unknown.exe',
    time: '۲ دقیقه پیش',
    severity: 'high',
    icon: 'i-lucide-shield-alert'
  },
  {
    id: 2,
    title: 'مقصد جدید شناسایی شد',
    description: 'chrome.exe به یک IP خارجی جدید (185.42.169.7) متصل شده است.',
    source: 'chrome.exe',
    time: '۸ دقیقه پیش',
    severity: 'medium',
    icon: 'i-lucide-globe-2'
  },
  {
    id: 3,
    title: 'افزایش ناگهانی ارتباطات',
    description: '۴۲ ارتباط جدید طی ۱۰ ثانیه شناسایی شده است.',
    source: 'svchost.exe',
    time: '۲۱ دقیقه پیش',
    severity: 'medium',
    icon: 'i-lucide-zap'
  },
  {
    id: 4,
    title: 'تلاش ورود مکرر ناموفق',
    description: '۱۵ تلاش ناموفق برای اتصال به پورت ۲۲ از آدرس 91.98.44.12 ثبت شد.',
    source: 'sshd',
    time: '۳۴ دقیقه پیش',
    severity: 'high',
    icon: 'i-lucide-lock-keyhole'
  },
  {
    id: 5,
    title: 'درخواست DNS مشکوک',
    description: 'درخواست‌های DNS متعدد به دامنه‌ای با رتبه پایین شناسایی شد.',
    source: 'spotify.exe',
    time: '۱ ساعت پیش',
    severity: 'low',
    icon: 'i-lucide-server-off'
  },

]
