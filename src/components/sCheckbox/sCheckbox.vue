<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <div class="s-checkbox">
    <input id="checkbox" v-model="checked" type="checkbox" class="hidden" />
    <label for="checkbox" class="flex cursor-pointer items-center gap-2">
      <div class="h-6 w-6">
        <div
          :class="[
            'flex',
            'h-full',
            'flex-1',
            'items-center',
            'justify-center',
            'rounded-sm',
            { 'bg-gray-900 opacity-10': !checked },
            { 'bg-indigo-500': checked },
            'pl-1.5',
            'pr-1',
            'pt-1.5',
            'pb-2'
          ]"
        >
          <img
            v-if="checked"
            src="/assets/desktop/icon-check.svg"
            alt="checkmark"
          />
        </div>
      </div>
      <div class="text-sm font-bold">
        <slot />
      </div>
    </label>
  </div>
</template>
