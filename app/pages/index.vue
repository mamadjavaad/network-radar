<script setup lang="ts">
import {
  NETWORK_STATS,
  NETWORK_ALERTS,
  TOP_PROCESSES,
} from '../data/networkData.ts'
definePageMeta({
  label: 'نمای کلی'  
})
const stats = ref(NETWORK_STATS)
const alerts = ref(NETWORK_ALERTS)
const topProcesses = ref(TOP_PROCESSES)
</script>

<template>
  <UContainer class="space-y-4 py-4">
   
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <UCard v-for="stat in stats" :key="stat.label" class="overflow-hidden">
        <div class="flex items-start justify-between">
          <div class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <UIcon :name="stat.icon" class="size-5" />
          </div>

          <UBadge color="success" variant="subtle" size="xs">
            {{ stat.change }}
          </UBadge>
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
              <h3 class="font-semibold">
                هشدارهای اخیر
              </h3>

              <p class="text-xs text-muted">
                آخرین ناهنجاری‌های شناسایی‌شده
              </p>
            </div>

            <UBadge color="error" variant="subtle">
              {{ alerts.length }}
            </UBadge>
          </div>
        </template>

        <div class="space-y-4">
          <button v-for="alert in alerts" :key="alert.title"
            class="group flex w-full items-start gap-3 rounded-xl text-right transition hover:bg-elevated/60">
            <div class="flex size-9 shrink-0 items-center justify-center rounded-lg" :class="{
              'bg-error/10 text-error': alert.severity === 'high',
              'bg-warning/10 text-warning': alert.severity === 'medium'
            }">
              <UIcon :name="alert.icon" class="size-4" />
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <p class="truncate text-sm font-medium">
                  {{ alert.title }}
                </p>

                <span v-if="alert.severity === 'high'" class="size-1.5 rounded-full bg-error" />
              </div>

              <p class="mt-1 line-clamp-2 text-xs text-muted">
                {{ alert.description }}
              </p>

              <p class="mt-1 text-[10px] text-dimmed">
                {{ alert.time }}
              </p>
            </div>
          </button>
        </div>

        <template #footer>
          <UButton to="/alerts" color="neutral" variant="ghost" block size="sm" trailing-icon="i-lucide-arrow-left"
            label="مشاهده همه هشدارها" />
        </template>
      </UCard>
    </div>
  </UContainer>
</template>
