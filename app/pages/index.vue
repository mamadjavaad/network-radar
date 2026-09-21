<script setup lang="ts">
definePageMeta({
  label: 'نمای کلی'
})

const { connections, error: connectionsError } = useConnections()
const { processes, totalSentBytes, totalRecvBytes } = useProcesses()
const { buckets } = useTrafficTimeline(30)
const { alerts, acknowledge } = useAlerts()

const ALERT_ICONS: Record<string, string> = {
  new_destination: 'i-lucide-map-pin-plus',
  high_download: 'i-lucide-arrow-down',
  high_upload: 'i-lucide-arrow-up',
  connection_burst: 'i-lucide-zap'
}

function alertIcon(type: string): string {
  return ALERT_ICONS[type] ?? 'i-lucide-triangle-alert'
}

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'همین الان'
  if (mins < 60) return `${mins} دقیقه پیش`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} ساعت پیش`
  return `${Math.floor(hours / 24)} روز پیش`
}

function formatBytes(n: number): string {
  if (!n) return '۰ B'
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  if (n < 1024 * 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`
  return `${(n / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

const listeningCount = computed(
  () => connections.value.filter(c => c.status === 'در حال گوش دادن').length
)

const stats = computed(() => [
  {
    label: 'ترافیک شبکه',
    value: formatBytes(totalRecvBytes.value + totalSentBytes.value),
    description: 'مجموع ثبت‌شده در بازه نگهداری',
    icon: 'i-lucide-activity'
  },
  {
    label: 'دریافت',
    value: formatBytes(totalRecvBytes.value),
    description: 'حجم داده دریافتی',
    icon: 'i-lucide-arrow-down'
  },
  {
    label: 'ارسال',
    value: formatBytes(totalSentBytes.value),
    description: 'حجم داده ارسالی',
    icon: 'i-lucide-arrow-up'
  },
  {
    label: 'ارتباطات فعال',
    value: String(connections.value.length),
    description: `${listeningCount.value} مورد در حال گوش دادن`,
    icon: 'i-lucide-network'
  }
])

const topProcesses = computed(() =>
  processes.value.slice(0, 5).map(p => ({
    name: p.name,
    value: p.usage,
    traffic: `↓${p.download} ↑${p.upload}`
  }))
)
const unacknowledgedCount = computed(() =>
  alerts.value.filter(a => !a.acknowledged).length
)

const recentAlerts = computed(() =>
  [...alerts.value]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3)
)
</script>

<template>
  <UContainer class="space-y-4 py-4">

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <UCard v-for="stat in stats" :key="stat.label" class="overflow-hidden">
        <div class="flex items-start justify-between">
          <div class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <UIcon :name="stat.icon" class="size-5" />
          </div>

          <UIcon name="i-lucide-radio" class="size-3.5 animate-pulse text-primary" />
        </div>

        <div class="mt-4">
          <p class="text-sm text-muted">
            {{ stat.label }}
          </p>

          <p class="mt-1 text-2xl font-semibold tracking-tight">
            {{ stat.value }}
          </p>

          <p class="mt-1 text-xs text-muted">
            {{ stat.description }}
          </p>
        </div>
      </UCard>
    </div>
    <UAlert v-if="connectionsError" color="error" variant="subtle" icon="i-lucide-wifi-off" :title="connectionsError"
      description="بک‌اند در حال اجرا روی پورت ۳۰۰۰ نیست یا در دسترس نیست" />

    <UCard>
      <template #header>
        <div>
          <h3 class="font-semibold">
            ترافیک شبکه
          </h3>

          <p class="text-xs text-muted">
            ۳۰ دقیقه گذشته، تفکیک‌شده به‌ازای هر دقیقه
          </p>
        </div>
      </template>

      <TrafficChart :buckets="buckets || []" />
    </UCard>

    <div class="grid gap-6 xl:grid-cols-2">
      <UCard>
        <template #header>
          <div>
            <h3 class="font-semibold">
              فرآیندهای پرترافیک
            </h3>

            <p class="text-xs text-muted">
              بیشترین میزان استفاده از شبکه
            </p>
          </div>
        </template>

        <div class="space-y-5">
          <div v-for="process in topProcesses" :key="process.name">
            <div class="mb-2 flex items-center justify-between gap-3">
              <div class="flex min-w-0 items-center gap-2">
                <div class="flex size-7 items-center justify-center rounded-md bg-elevated">
                  <UIcon name="i-lucide-circle-dot" class="size-3.5 text-muted" />
                </div>

                <span class="truncate text-sm font-medium">
                  {{ process.name }}
                </span>
              </div>

              <span class="shrink-0 text-xs text-muted">
                {{ process.traffic }}
              </span>
            </div>

            <UProgress :model-value="process.value" size="sm" />
          </div>
        </div>
      </UCard>
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold">هشدارهای اخیر</h3>
              <p class="text-xs text-muted">آخرین ناهنجاریهای شناساییشده</p>
            </div>
            <UBadge v-if="unacknowledgedCount" color="error" variant="subtle">
              {{ unacknowledgedCount }}
            </UBadge>
          </div>
        </template>

        <div v-if="recentAlerts.length === 0" class="py-6 text-center text-sm text-muted">
          هیچ هشداری ثبت نشده است
        </div>

        <div v-else class="space-y-4">
          <button v-for="alert in recentAlerts" :key="alert.id"
            class="group flex w-full items-start gap-3 rounded-xl text-right transition hover:bg-elevated/60"
            :class="{ 'opacity-50': alert.acknowledged }" @click="acknowledge(alert.id)">
            <!-- your existing button content -->
            <div class="flex size-9 shrink-0 items-center justify-center rounded-lg" :class="{
              'bg-error/10 text-error': alert.severity === 'high',
              'bg-warning/10 text-warning': alert.severity === 'medium',
              'bg-elevated text-muted': alert.severity === 'low'
            }">
              <UIcon :name="alertIcon(alert.type)" class="size-4" />
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <p class="truncate text-sm font-medium">{{ alert.title }}</p>
                <span v-if="alert.severity === 'high' && !alert.acknowledged" class="size-1.5 rounded-full bg-error" />
              </div>
              <p class="mt-1 line-clamp-2 text-xs text-muted">{{ alert.description }}</p>
              <p class="mt-1 text- text-dimmed">{{ relativeTime(alert.created_at) }}</p>
            </div>
          </button>
        </div>

        <template #footer>
          <UButton v-if="alerts.length > 5" to="/alerts" color="neutral" variant="ghost" block size="sm"
            trailing-icon="i-lucide-arrow-left" label="مشاهده همه هشدارها" />
        </template>
      </UCard>
    </div>
  </UContainer>
</template>
