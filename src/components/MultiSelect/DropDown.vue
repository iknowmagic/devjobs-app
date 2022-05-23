<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  list: null | string[]
}

const props = withDefaults(defineProps<Props>(), {
  list: null
})

const emit = defineEmits(['addItem'])
const addItem = (item: string) => {
  emit('addItem', item)
}
</script>

<template>
  <div
    class="top-100 lef-0 max-h-select absolute z-40 w-full max-w-[332px] overflow-y-auto rounded bg-white shadow"
  >
    <div class="flex w-full flex-col">
      <template v-for="(item, key) in props.list" :key="key">
        <div
          class="w-full cursor-pointer rounded-t border-b border-gray-100 hover:bg-teal-100"
          @click="addItem(item)"
        >
          <div
            class="relative flex w-full items-center border-l-2 border-transparent p-2 pl-2 hover:border-teal-100"
          >
            <div class="flex w-full items-center">
              <div class="mx-2 leading-6">{{ item }}</div>
            </div>
          </div>
        </div>
      </template>
      <div
        v-if="props.list && props.list.length === 0"
        class="p-2 pl-2 text-gray-500"
      >
        No more items available.
      </div>
    </div>
  </div>
</template>
