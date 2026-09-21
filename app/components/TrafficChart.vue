<script setup lang="ts">

interface Bucket {
  bucket: string
  sent: number
  recv: number
}

const props = withDefaults(defineProps<{
  buckets?: Bucket[]
}>(), {
  buckets: () => []
})

const WIDTH = 600
const HEIGHT = 160
const PAD_BOTTOM = 18

const data = computed<Bucket[]>(() => props.buckets ?? [])

function formatBytes(n: number): string {
  if (!n) return '۰'
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`
  if (n < 1024 * 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`
  return `${(n / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

const maxValue = computed(() => {
  const all = data.value.flatMap(b => [b.sent, b.recv])
  return Math.max(1, ...all)
})

function buildPath(key: 'sent' | 'recv', close: boolean) {
  const list = data.value
  const n = list.length
  if (n === 0) return ''

  const plotH = HEIGHT - PAD_BOTTOM
  const step = n === 1 ? 0 : WIDTH / (n - 1)

  const points = list.map((b, i) => {
    const x = n === 1 ? WIDTH / 2 : i * step
    const y = plotH - ((b[key] || 0) / maxValue.value) * (plotH - 4)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  const line = `M${points.join(' L')}`
  if (!close) return line

  const lastX = n === 1 ? WIDTH / 2 : (n - 1) * step
  return `${line} L${lastX.toFixed(1)},${plotH} L0,${plotH} Z`
}

const recvLine = computed(() => buildPath('recv', false))
const recvArea = computed(() => buildPath('recv', true))
const sentLine = computed(() => buildPath('sent', false))

const totals = computed(() => ({
  sent: data.value.reduce((s, b) => s + (b.sent || 0), 0),
  recv: data.value.reduce((s, b) => s + (b.recv || 0), 0)
}))

const labels = computed(() => {
  const list = data.value
  const n = list.length
  if (n === 0) return []

  const wanted = Math.min(5, n)
  const stepIdx = Math.max(1, Math.floor(n / wanted))
  const out: { x: number, text: string }[] = []

  for (let i = 0; i < n; i += stepIdx) {
    const item = list[i]
    if (!item) continue
    const x = n === 1 ? WIDTH / 2 : (i / (n - 1)) * WIDTH
    out.push({ x, text: String(item.bucket || '').slice(11) })
  }
  return out
})
</script>

<template>
  <div>
    <div v-if="data.length === 0" class="flex h-40 items-center justify-center text-sm text-muted">
      هنوز داده‌ای ثبت نشده است
    </div>

    <div v-else>
      <div class="mb-3 flex items-center gap-4 text-xs">
        <div class="flex items-center gap-1.5">
          <span class="size-2 rounded-full bg-info" />
          <span class="text-muted">دریافت</span>
          <span class="font-medium">{{ formatBytes(totals.recv) }}</span>
        </div>

        <div class="flex items-center gap-1.5">
          <span class="size-2 rounded-full bg-warning" />
          <span class="text-muted">ارسال</span>
          <span class="font-medium">{{ formatBytes(totals.sent) }}</span>
        </div>
      </div>

      <svg
        dir="ltr"
        :viewBox="`0 0 ${WIDTH} ${HEIGHT}`"
        class="w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="network traffic chart"
      >
        <path :d="recvArea" class="fill-info/15" />
        <path :d="recvLine" class="stroke-info" fill="none" stroke-width="2" vector-effect="non-scaling-stroke" />
        <path :d="sentLine" class="stroke-warning" fill="none" stroke-width="2" vector-effect="non-scaling-stroke" />
      </svg>

      <div dir="ltr" class="relative h-4">
        <span
          v-for="label in labels"
          :key="label.text"
          class="absolute -translate-x-1/2 text-[10px] text-dimmed"
          :style="{ left: `${(label.x / WIDTH) * 100}%` }"
        >
          {{ label.text }}
        </span>
      </div>
    </div>
  </div>
</template>
