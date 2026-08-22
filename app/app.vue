<script setup lang="ts">
const sidebarItems = [
  {
    label: 'نمای کلی',
    icon: 'i-lucide-activity',
    to: '/'
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
    label: 'هشدارها',
    icon: 'i-lucide-triangle-alert',
    to: '/alerts',
    badge: '۳'
  },
  {
    label: 'نقشه شبکه',
    icon: 'i-lucide-globe-2',
    to: '/network'
  },
  {
    label: 'تنظیمات',
    icon: 'i-lucide-settings',
    to: '/settings'
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
