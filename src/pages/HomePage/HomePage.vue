<script setup lang="ts">
import MultiSelect from '@/components/MultiSelect'
import { ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import api from '@/services'

import { Promised } from 'vue-promised'
import SingleJob from './SingleJob.vue'

import { LocationsInterface } from '@/../types'

const selectedItems = ref([])

const error = ref(false)
const jobs = ref([])

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const jobsPromise = api.data.getJobs()
// const jobsPromise = sleep(1000000)

const locations = ref<LocationsInterface>([])
const getLocations = async () => {
  const result = await api.data.getLocations().catch(() => {
    console.log('Error getting locations.')
  })
  if (result?.data) {
    locations.value = result.data
  }
}

// const getJobs = async () => {
//   await sleep(30000)
//   const response = await .catch(() => {
//     error.value = true
//   })

//   if (response?.data) {
//     jobs.value = response.data
//   }
// }

const init = async () => {
  await getLocations()
}

init()
</script>

<template>
  <main
    class="h-full min-h-[100vh] w-full max-w-[1600px] bg-[#F4F6F8] font-display"
  >
    <header
      class="grid h-[162px] w-full grid-cols-2 justify-evenly bg-header-lg bg-cover bg-no-repeat px-[165px] pt-[45px]"
    >
      <router-link
        :to="{ name: 'home' }"
        class="block h-[32px] w-[115px] bg-logo-lg bg-no-repeat"
      />

      <div class="text-right">hello</div>
    </header>
    <div class="mt-[-45px] px-[165px]">
      <section
        class="col-span-2 grid h-fit min-h-[80px] grid-cols-3 items-center rounded-lg bg-white px-[32px]"
      >
        <div class="flex items-center gap-2">
          <img
            src="/assets/desktop/icon-location.svg"
            alt="location"
            class="h-[24px] w-[17px]"
          />
          <MultiSelect
            v-model:items="locations"
            v-model:selectedItems="selectedItems"
            placeholder="Filter by location..."
          />
        </div>
        <div>
          <sCheckbox>Full Time Only</sCheckbox>
          <sButton>Search</sButton>
        </div>
      </section>
      <section class="py-[100px]">
        <Promised :promise="jobsPromise">
          <!-- Use the "pending" slot to display a loading message -->
          <template #pending>
            <div class="flex w-full justify-center">
              <sLoading size="xl" />
            </div>
          </template>
          <!-- The default scoped slot will be used as the result -->
          <template #default="{ data: response }">
            <div class="grid grid-cols-3 gap-x-[30px] gap-y-[65px]">
              <template v-for="item in response.data" :key="item.id">
                <SingleJob :item="item" />
              </template>
            </div>
            <div v-if="response.nextPage" class="flex justify-center pt-14">
              <sButton>Load More</sButton>
            </div>
          </template>
          <!-- The "rejected" scoped slot will be used if there is an error -->
          <template #rejected>
            <p>Error loading the data. Please try again later.</p>
          </template>
        </Promised>
      </section>
    </div>
    <footer></footer>
  </main>
</template>
