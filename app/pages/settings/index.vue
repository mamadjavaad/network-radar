<script setup lang="ts">
import {
  GENERAL_SETTINGS,
  MONITORING_SETTINGS,
  APP_INFO,
  type ToggleSetting
} from '~/data/settingsData'
definePageMeta({
  label: 'تنظیمات' 
})
const general = reactive(GENERAL_SETTINGS) as ToggleSetting[]
const monitoring = reactive(MONITORING_SETTINGS) as ToggleSetting[]
const trafficThreshold = ref('500')
const timeThreshold = ref('10')

</script>

<template>
  <UContainer class="space-y-4 py-4">

    <div class="grid gap-4 xl:grid-cols-2">
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UIcon name="i-lucide-settings" class="size-4" />
            </div>

            <div>
              <h3 class="font-semibold">
                عمومی
              </h3>

            </div>
          </div>
        </template>

        <div class="space-y-4">
          <div v-for="item in general" :key="item.label" class="flex items-center justify-between gap-3">
            <div class="flex min-w-0 items-center gap-3">
              <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-elevated text-muted">
                <UIcon :name="item.icon" class="size-4" />
              </div>

              <div class="min-w-0">
                <p class="text-sm font-medium">
                  {{ item.label }}
                </p>
              </div>
            </div>

            <USwitch v-model="item.enabled" />
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="flex size-9 items-center justify-center rounded-lg bg-info/10 text-info">
              <UIcon name="i-lucide-radar" class="size-4" />
            </div>

            <div>
              <h3 class="font-semibold">
                تشخیص ناهنجاری
              </h3>

              <p class="text-xs text-muted">
                نحوه جمع‌آوری و ذخیره اطلاعات 
              </p>
            </div>
          </div>
        </template>

        <div class="space-y-4">
          <div v-for="item in monitoring" :key="item.label" class="flex items-center justify-between gap-3">
            <div class="flex min-w-0 items-center gap-3">
              <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-elevated text-muted">
                <UIcon :name="item.icon" class="size-4" />
              </div>

              <div class="min-w-0">
                <p class="text-sm font-medium">
                  {{ item.label }}
                </p>

                <p class="mt-0.5 text-xs text-muted">
                  {{ item.description }}
                </p>
              </div>
            </div>

            <USwitch v-model="item.enabled" />
          </div>

          <div class="flex flex-wrap items-end justify-between gap-3 border-t border-default pt-4">
            <UFormField label="آستانه ترافیک (مگابایت)" description="مقدار پیش فرض هشدار برای هر فرایند" class="grow">
              <UInput v-model="trafficThreshold" size="sm" class="w-32" />
            </UFormField>
             <UFormField label="مدت نگهداری تاریخچه (روز)" description="حداکثر 30 روز" class="grow">
              <UInput v-model="timeThreshold" size="sm" class="w-32" />
            </UFormField>
          </div>
        </div>
      </UCard>
    </div>
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
        <div
          v-for="info in APP_INFO"
          :key="info.label"
          class="flex items-center justify-between text-sm"
        >
          <span class="text-muted">{{ info.label }}</span>
          <span class="font-medium">{{ info.value }}</span>
        </div>
      </div>

      <template #footer>
        <UButton
          to="https://github.com/mamadjavaad/networkradar"
          target="_blank"
          color="neutral"
          variant="ghost"
          block
          size="sm"
          icon="i-lucide-github"
          label="مشاهده ریپازیتوری گیت‌هاب"
        />
      </template>
    </UCard>
  </UContainer>
  
</template>
