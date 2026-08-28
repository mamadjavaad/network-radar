<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import { PROCESSES, type ProcessRecord, type ProcessStatus } from '~/data/processesData'

definePageMeta({
  label: 'فرایند ها'
})

const processes = ref(PROCESSES)
const table = useTemplateRef('table')

const statusLabels: Record<ProcessStatus, string> = {
  normal: 'عادی',
  Average: 'متوسط',
  heavy: 'زیاد'
}

const statusBadgeColors: Record<ProcessStatus, 'success' | 'warning' | 'error'> = {
  normal: 'success',
  Average: 'warning',
  heavy: 'error'
}

const progressColors: Record<ProcessStatus, 'primary' | 'warning' | 'error'> = {
  normal: 'primary',
  Average: 'warning',
  heavy: 'error'
}

const processIcons: Record<string, string> = {
  'chrome.exe': 'i-lucide-globe',
  'steam.exe': 'i-lucide-gamepad-2',
  'discord.exe': 'i-lucide-message-circle',
  'unknown.exe': 'i-lucide-file-question',
  'svchost.exe': 'i-lucide-cog',
  'node.exe': 'i-lucide-hexagon'
}

const columns: TableColumn<ProcessRecord>[] = [
  { accessorKey: 'name', header: 'فرآیند' },
  { accessorKey: 'download', header: 'دانلود' },
  { accessorKey: 'upload', header: 'آپلود' },
  { accessorKey: 'connections', header: 'اتصالات' },
  { accessorKey: 'usage', header: 'مصرف شبکه' },
  { accessorKey: 'status', header: 'وضعیت' }
]

const pagination = ref({
  pageIndex: 0,
  pageSize: 5
})
</script>

<template>
  <UContainer class="space-y-4 py-4">
    <UCard>
      <template #header>
        <div class="p-2">
          <h3 class="font-semibold">
            فرآیندهای بر اساس مصرف
          </h3>

          <p class="text-xs text-muted">
            مرتب‌ شده بر اساس میزان استفاده از شبکه
          </p>
        </div>
      </template>

      <UTable ref="table" v-model:pagination="pagination"
        :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }" :data="processes" :columns="columns"
        class="flex-1" :ui="{
          td: 'py-4 px-1',
        }">
        <template #name-cell="{ row }">
          <div class="flex items-center gap-2 ">
            <div class="flex size-7 shrink-0
                 items-center justify-center
                 rounded-md"
              :class="row.original.status === 'heavy' ? 'bg-error/10 text-error' : 'bg-elevated text-muted'">
              <UIcon :name="processIcons[row.original.name] ?? 'i-lucide-circle-dot'" class="size-3.5" />
            </div>

            <span class="truncate text-sm font-medium">{{ row.original.name }}</span>

            <span class="shrink-0 text-[10px] text-dimmed">PID {{ row.original.pid }}</span>
          </div>
        </template>

        <template #download-cell="{ row }">
          <span class="text-xs">{{ row.original.download }}</span>
        </template>

        <template #upload-cell="{ row }">
          <span class="text-xs">{{ row.original.upload }}</span>
        </template>

        <template #connections-cell="{ row }">
          <span class="text-xs text-muted">{{ row.original.connections }} اتصال</span>
        </template>

        <template #usage-cell="{ row }">
          <div class="flex min-w-32 items-center gap-2">
            <UProgress :model-value="row.original.usage" :color="progressColors[row.original.status]" size="md"
              class="w-24" />

            <span class="shrink-0 text-[10px] text-dimmed">{{ row.original.usage }}٪</span>
          </div>
        </template>

        <template #status-cell="{ row }">
          <UBadge :color="statusBadgeColors[row.original.status]" variant="subtle" size="md" class="p-3">
            {{ statusLabels[row.original.status] }}
          </UBadge>
        </template>
      </UTable>

      <div class="flex justify-center border-t border-default pt-4">
        <UPagination :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="table?.tableApi?.getFilteredRowModel().rows.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" />
      </div>
    </UCard>
  </UContainer>
</template>
