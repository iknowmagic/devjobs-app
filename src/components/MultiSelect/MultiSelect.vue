<script setup lang="ts">
import { ref } from 'vue'

import DropDown from './DropDown.vue'

import { OnClickOutside } from '@vueuse/components'
import { useTimeoutFn } from '@vueuse/core'

import sLoading from '@/components/sLoading'

const selectedItems = ref<string[]>([])
const items = ref(['john', 'milos', 'steph', 'kathreine'].sort())
const dropdown = ref(false)

const toggleDropdown = () => {
  dropdown.value = !dropdown.value
}
const addTag = (item: string) => {
  items.value = items.value.filter(i => i !== item)
  items.value.sort()
  selectedItems.value.push(item)
  selectedItems.value.sort()

  if (items.value.length === 0) {
    useTimeoutFn(() => {
      dropdown.value = false
    }, 1500)
  }
}
const removeTag = (item: string) => {
  items.value.push(item)
  items.value.sort()
  selectedItems.value = selectedItems.value.filter(i => i !== item)
  selectedItems.value.sort()
}

interface Props {
  placeholder: string
  width: number
  loading: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: null as unknown as string,
  width: 250,
  loading: false
})
</script>

<template>
  <OnClickOutside @trigger="dropdown = false">
    <div
      :class="[
        'autocomplete-wrapper',
        `max-w-[${width}px]`,
        `min-w-[${width}px]`
      ]"
    >
      <div class="autocomplete">
        <div class="mx-auto flex w-full flex-col items-center">
          <div class="w-full">
            <div class="relative flex flex-col items-center">
              <div class="w-full">
                <div
                  class="my-2 flex rounded border border-gray-200 bg-white p-1"
                >
                  <div class="flex flex-auto flex-wrap">
                    <template
                      v-for="(tag, index) in selectedItems"
                      :key="index"
                    >
                      <div
                        class="m-1 flex items-center justify-center rounded-full border border-teal-300 bg-teal-100 py-1 px-2 font-medium text-teal-700"
                      >
                        <div
                          class="max-w-full flex-initial text-xs font-normal leading-none"
                        >
                          {{ tag }}
                        </div>
                        <div class="flex flex-auto flex-row-reverse">
                          <div @click="removeTag(tag)">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="100%"
                              height="100%"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              class="feather feather-x ml-2 h-4 w-4 cursor-pointer rounded-full hover:text-teal-400"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </template>
                    <div class="flex-1">
                      <input
                        :placeholder="
                          selectedItems.length === 0 ? props.placeholder : ''
                        "
                        class="h-full w-full appearance-none bg-transparent p-1 px-2 text-gray-800 outline-none placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                  <div
                    class="flex w-8 items-center border-l border-gray-200 py-1 pl-2 pr-1 text-gray-300"
                    @click="toggleDropdown"
                  >
                    <button
                      class="h-6 w-6 cursor-pointer text-gray-600 outline-none focus:outline-none"
                      :class="{ 'rotate-180 pl-[7px]': dropdown }"
                    >
                      <sLoading v-if="loading" />
                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        class="feather feather-chevron-up h-4 w-4"
                      >
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Transition>
          <DropDown
            v-if="dropdown"
            :list="items"
            :width="width"
            @addItem="addTag"
          />
        </Transition>
      </div>
    </div>
  </OnClickOutside>
</template>
