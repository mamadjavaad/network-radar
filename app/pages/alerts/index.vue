<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import { ALERT_RECORDS, type AlertRecord } from '~/data/alertsData'

definePageMeta({
  label: 'هشدار ها'
})

type SeverityFilter = 'all' | 'high' | 'medium' | 'low'

const alerts = ref(ALERT_RECORDS)
const activeFilter = ref<SeverityFilter>('all')
const table = useTemplateRef('table')

const filters: { label: string, value: SeverityFilter }[] = [
  { label: 'همه', value: 'all' },
  { label: 'بحرانی', value: 'high' },
  { label: 'متوسط', value: 'medium' },
  { label: 'کم‌اهمیت', value: 'low' }
]

const filteredAlerts = computed(() =>
  activeFilter.value === 'all'
    ? alerts.value
    : alerts.value.filter(alert => alert.severity === activeFilter.value)
)

const severityLabels = { high: 'بحرانی', medium: 'متوسط', low: 'کم‌اهمیت' } as const

const severityColors = { high: 'error', medium: 'warning', low: 'info' } as const

const severityIconClasses = {
  high: 'bg-error/10 text-error',
  medium: 'bg-warning/10 text-warning',
  low: 'bg-info/10 text-info'
} as const

const columns: TableColumn<AlertRecord>[] = [
  { accessorKey: 'title', header: 'هشدار' },
  { accessorKey: 'source', header: 'منبع' },
  { accessorKey: 'severity', header: 'سطح اهمیت' },
  { accessorKey: 'time', header: 'زمان' }
]

const pagination = ref({
  pageIndex: 0,
  pageSize: 5
})

// reset to first page whenever the filter changes, so you don't
// land on an empty page after filtering down to fewer rows
watch(activeFilter, () => {
  pagination.value.pageIndex = 0
})
</script>

<template>
  <UContainer class="space-y-4 py-4">
    <div class="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <UBadge color="error" variant="subtle" size="xl">
          {{ alerts.filter(alert => alert.severity === 'high').length }} هشدار بحرانی فعال
        </UBadge>
        <p class="mt-1 text-sm text-muted">
          تمام ناهنجاری‌های شناسایی‌شده در شبکه شما.
        </p>
      </div>

      <div class="flex items-center gap-2 text-xs text-muted">
        <UIcon name="i-lucide-clock-3" class="size-4" />
        آخرین بررسی: همین الان
      </div>
    </div>

    <UCard>
      <template #header>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 class="font-semibold">
              لیست هشدارها
            </h3>

            <p class="text-xs text-muted">
              برای فیلتر کردن، سطح اهمیت را انتخاب کنید
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-1.5">
            <UButton
              v-for="filter in filters"
              :key="filter.value"
              :label="filter.label"
              size="xs"
              :color="activeFilter === filter.value ? 'primary' : 'neutral'"
              :variant="activeFilter === filter.value ? 'soft' : 'ghost'"
              @click="activeFilter = filter.value"
            />
          </div>
        </div>
      </template>

      <UTable
        ref="table"
        v-model:pagination="pagination"
        :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
        :data="filteredAlerts"
        :columns="columns"
        class="flex-1"
      >
        <template #title-cell="{ row }">
          <div class="flex min-w-0 items-start gap-3">
            <div class="flex size-9 shrink-0 items-center justify-center rounded-lg" :class="severityIconClasses[row.original.severity]">
              <UIcon :name="row.original.icon" class="size-4" />
            </div>

            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <p class="truncate text-sm font-medium">{{ row.original.title }}</p>

                <span v-if="row.original.severity === 'high'" class="size-1.5 shrink-0 rounded-full bg-error" />
              </div>

              <p class="mt-0.5 line-clamp-1 text-xs text-muted">{{ row.original.description }}</p>
            </div>
          </div>
        </template>

        <template #source-cell="{ row }">
          <span class="font-mono text-xs text-muted">{{ row.original.source }}</span>
        </template>

        <template #severity-cell="{ row }">
          <UBadge :color="severityColors[row.original.severity]" variant="subtle" size="xs">
            {{ severityLabels[row.original.severity] }}
          </UBadge>
        </template>

        <template #time-cell="{ row }">
          <span class="text-[10px] text-dimmed">{{ row.original.time }}</span>
        </template>

        <template #empty>
          <div class="flex flex-col items-center gap-2 py-10 text-muted">
            <UIcon name="i-lucide-inbox" class="size-8" />
            <p class="text-sm">هشداری در این دسته وجود ندارد</p>
          </div>
        </template>
      </UTable>

      <div v-if="filteredAlerts.length > pagination.pageSize" class="flex justify-center border-t border-default pt-4">
        <UPagination
          :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="table?.tableApi?.getFilteredRowModel().rows.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>

      <template #footer>
        <UButton to="/settings" color="neutral" variant="ghost" block size="sm" trailing-icon="i-lucide-arrow-left" label="تنظیمات هشدارها" />
      </template>
    </UCard>
  </UContainer>
</template>