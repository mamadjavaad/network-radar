<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import type { ConnectionRecord } from '~/data/connectionsData'

definePageMeta({
  label: 'ارتباطات'
})

const { connections, lastUpdated, error, refresh: refetch } = useConnections()
const query = ref('')
const table = useTemplateRef('table')

const filteredConnections = computed(() => {
  const q = query.value.trim().toLowerCase()

  if (!q) return connections.value

  return connections.value.filter(
    conn =>
      conn.process.toLowerCase().includes(q)
      || conn.remoteAddress.includes(q)
      || conn.pid.includes(q)
  )
})

const statusColors = {
  'برقرار': 'success',
  'در حال گوش دادن': 'info',
  'در انتظار': 'warning'
} as const

const columns: TableColumn<ConnectionRecord>[] = [
  { accessorKey: 'process', header: 'فرآیند' },
  { accessorKey: 'protocol', header: 'پروتکل' },
  { accessorKey: 'localAddress', header: 'آدرس محلی' },
  { accessorKey: 'remoteAddress', header: 'آدرس مقصد' },
  { accessorKey: 'direction', header: 'جهت' },
  { accessorKey: 'status', header: 'وضعیت' },
  { accessorKey: 'traffic', header: 'ترافیک' }
]

const pagination = ref({
  pageIndex: 0,
  pageSize: 5
})


watch(query, () => {
  pagination.value.pageIndex = 0
})
</script>

<template>
  <UContainer class="space-y-4 py-4">
    <UCard>
      <template #header>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 class="font-semibold">
              ارتباطات فعال
            </h3>

            <p class="text-xs text-muted">
              {{ filteredConnections.length }} ارتباط نمایش داده می‌شود
              <span v-if="lastUpdated">· آخرین بروزرسانی {{ lastUpdated }}</span>
            </p>
          </div>

          <UInput
            v-model="query"
            icon="i-lucide-search"
            placeholder="جستجوی فرآیند یا IP..."
            size="sm"
            class="w-full sm:w-64"
          />
        </div>
      </template>

      <UTable
        ref="table"
        v-model:pagination="pagination"
        :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
        :data="filteredConnections"
        :columns="columns"
        class="flex-1"
      >
        <template #process-cell="{ row }">
          <div class="flex items-center gap-2">
            <div
              class="flex size-7 shrink-0 items-center justify-center rounded-md"
              :class="row.original.suspicious ? 'bg-error/10 text-error' : 'bg-elevated text-muted'"
            >
              <UIcon name="i-lucide-network" class="size-3.5" />
            </div>

            <span class="truncate text-sm font-medium">{{ row.original.process }}</span>

            <span class="shrink-0 text-[10px] text-dimmed">PID {{ row.original.pid }}</span>

            <span v-if="row.original.suspicious" class="size-1.5 shrink-0 rounded-full bg-error" />
          </div>
        </template>

        <template #protocol-cell="{ row }">
          <UBadge :color="row.original.protocol === 'TCP' ? 'info' : 'neutral'" variant="subtle" size="xs">
            {{ row.original.protocol }}
          </UBadge>
        </template>

        <template #localAddress-cell="{ row }">
          <span dir="ltr" class="font-mono text-xs text-muted">{{ row.original.localAddress }}</span>
        </template>

        <template #remoteAddress-cell="{ row }">
          <span dir="ltr" class="font-mono text-xs text-muted">{{ row.original.remoteAddress }}</span>
        </template>

        <template #direction-cell="{ row }">
          <div v-if="row.original.direction === 'آپلود'" class="flex items-center gap-1 text-xs text-warning">
            <UIcon name="i-lucide-arrow-up" class="size-3.5" />
            آپلود
          </div>
          <div v-else-if="row.original.direction === 'دانلود'" class="flex items-center gap-1 text-xs text-info">
            <UIcon name="i-lucide-arrow-down" class="size-3.5" />
            دانلود
          </div>
          <span v-else class="text-xs text-dimmed">—</span>
        </template>

        <template #status-cell="{ row }">
          <UBadge :color="statusColors[row.original.status]" variant="subtle" size="xs">
            {{ row.original.status }}
          </UBadge>
        </template>

        <template #traffic-cell="{ row }">
          <span class="text-xs font-medium">{{ row.original.traffic }}</span>
        </template>

        <template #empty>
          <div class="flex flex-col items-center gap-2 py-10 text-muted">
            <UIcon name="i-lucide-search-x" class="size-8" />
            <p class="text-sm">نتیجه‌ای برای جستجوی شما پیدا نشد</p>
          </div>
        </template>
      </UTable>

      <div v-if="filteredConnections.length > pagination.pageSize" class="flex justify-center border-t border-default pt-4">
        <UPagination
          :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="table?.tableApi?.getFilteredRowModel().rows.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>

      <template #footer>
        <UButton color="neutral" variant="ghost" block size="sm" icon="i-lucide-refresh-cw" label="بروزرسانی لیست" @click="refetch" />
      </template>
    </UCard>

    <UAlert
      v-if="error"
      color="error"
      variant="subtle"
      icon="i-lucide-wifi-off"
      :title="error"
      description="بک‌اند روی پورت مورد نظر در دسترس نیست"
    />
  </UContainer>
</template>