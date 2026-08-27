<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')
const route = useRoute()
const pageLabel = computed(() => route.meta.label || ' ')
const toggleColorMode = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <UDashboardNavbar class="bg-elevated/30">
    <template #leading>
      <div>
        <h1 class="text-lg font-semibold">
          {{ pageLabel }}
        </h1>

      </div>
    </template>

    <template #right>
      <div class="flex items-center gap-1">
        <UButton color="neutral" variant="ghost" size="sm" :icon="isDark
          ? 'i-lucide-sun'
          : 'i-lucide-moon'" @click="toggleColorMode" />
        <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-github" to="https://github.com/mamadjavaad"
          target="_blank" />
      </div>
    </template>
  </UDashboardNavbar>
</template>
