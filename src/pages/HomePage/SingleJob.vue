<script setup lang="ts">
import { SingleJobInterface } from '@/../types'

interface Props {
  item: SingleJobInterface
}

const props = withDefaults(defineProps<Props>(), {
  item: () => {
    return {} as unknown as SingleJobInterface
  }
})
</script>

<template>
  <div class="relative cursor-pointer">
    <div
      class="absolute left-[32px] top-[-26px] flex h-[50px] w-[50px] items-center justify-center rounded-xl"
      :style="`background: ${props.item.logoBackground}`"
    >
      <img :src="props.item.logo" :alt="props.item.company" />
    </div>
    <div class="rounded-lg bg-white px-[32px] pt-[50px] pb-[32px]">
      <div class="flex gap-[12px] text-[#6E8098]">
        <div>{{ props.item.postedAt }}</div>
        <div>&middot;</div>
        <div>{{ props.item.contract }}</div>
      </div>
      <div class="mt-3 text-xl font-bold text-[#19202D]">
        {{ props.item.position }}
      </div>
      <div class="text-[#6E8098]">{{ props.item.company }}</div>
      <div class="mt-[40px] text-sm font-bold text-[#5964E0]">
        {{ props.item.location }}
      </div>
    </div>
  </div>
</template>
