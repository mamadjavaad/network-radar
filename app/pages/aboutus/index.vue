<script setup lang="ts">
import {
  APP_INFO,
} from '~/data/aboutusData'
definePageMeta({
  label: 'درباره ما'
})


</script>

<template>
  <UContainer class="space-y-4 py-4">

    <UCard class="mx-auto max-w-2xl">
      <div class="flex flex-col items-center gap-4 py-6 text-center">
        <div class="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <UIcon name="i-lucide-shield-check" class="size-8" />
        </div>

        <div>
          <h2 class="text-2xl font-semibold tracking-tight">
            نتورک رادار
          </h2>

        </div>

      </div>

      <div class="space-y-3 border-t border-default pt-4">
        <div v-for="info in APP_INFO" :key="info.label" class="flex items-center justify-between text-sm">
          <span class="text-muted">{{ info.label }}</span>
          <span class="font-medium">{{ info.value }}</span>
        </div>
      </div>

      <template #footer>
        <UButton to="https://github.com/mamadjavaad/networkradar" target="_blank" color="neutral" variant="ghost" block
          size="sm" icon="i-lucide-github" label="مشاهده ریپازیتوری گیت‌هاب" />
      </template>
    </UCard>
  </UContainer>

</template>
