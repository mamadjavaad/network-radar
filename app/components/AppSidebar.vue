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
  <UDashboardSidebar 
    :min-size="23"
    :default-size="23"
    :max-size="24"
    class="bg-elevated/30"
  >
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

    <UNavigationMenu
      :items="[
        props.items
      ]"
      orientation="vertical"
      class="w-full"
      :ui="{
        link: 'h-11 px-3 py-0 text-sm',
        linkLeadingIcon: 'size-5'
      }"
    />

  </UDashboardSidebar>
</template>
