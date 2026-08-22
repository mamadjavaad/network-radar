<script setup lang="ts">
interface SidebarItem {
  label: string
  to: string
  icon: string
  badge?: string | number
}

const props = defineProps<{
  items: SidebarItem[]
}>()
</script>

<template>
  <UDashboardSidebar collapsible resizable class="bg-elevated/30">
    <template #header>
      <div class="flex items-center gap-3 px-2 py-2">
        <div class="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <UIcon name="i-lucide-shield-check" class="size-5" />
        </div>

        <div class="min-w-0">
          <p class="truncate text-sm font-semibold">
            نتورک رادار
          </p>
        </div>
      </div>
    </template>

    <UNavigationMenu :items="[
      props.items
    ]" orientation="vertical" class="w-full" />

    <template #footer>
      <div class="px-2 pb-2">
        <UCard class="bg-default">
          <div class="flex items-start gap-3">
            <div class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
              <UIcon name="i-lucide-wifi" class="size-4" />
            </div>

            <div class="min-w-0">
              <p class="text-xs font-medium">
                وضعیت شبکه
              </p>

              <p class="mt-0.5 text-xs text-muted">
                در حال پایش
              </p>
            </div>

            <UBadge color="success" variant="subtle" size="sm" class="mr-auto">
              فعال
            </UBadge>
          </div>
        </UCard>
      </div>
    </template>
  </UDashboardSidebar>
</template>
