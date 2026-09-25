<script setup lang="ts">
const sidebarItems = [
  {
    label: 'نمای کلی',
    icon: 'i-lucide-activity',
    to: '/'
  }, {
    label: 'هشدارها',
    icon: 'i-lucide-triangle-alert',
    to: '/alerts',
    badge: '۳'
  },
  {
    label: 'ارتباطات',
    icon: 'i-lucide-network',
    to: '/connections'
  },
  {
    label: 'فرآیندها',
    icon: 'i-lucide-cpu',
    to: '/processes'
  },
  {
    label: 'درباره ما',
    icon: 'i-lucide-info',
    to: '/aboutus'
  }
]
</script>

<template>
  <div dir="rtl">
    <UDashboardGroup>
      <AppSidebar :items="sidebarItems" />
      <UDashboardPanel>
        <template #header>
          <AppNavbar />
        </template>

        <template #body>
          <NuxtPage />
        </template>
      </UDashboardPanel>
    </UDashboardGroup>
  </div>
</template>
