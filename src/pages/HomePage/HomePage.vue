<script setup lang="ts">
import MultiSelect from '@/components/MultiSelect'
</script>

<template>
  <main class="h-[100vh] w-full bg-[#F4F6F8]">
    <header
      class="grid h-[162px] w-full grid-cols-2 justify-evenly bg-header-lg bg-cover bg-no-repeat px-[165px] pt-[45px]"
    >
      <router-link
        :to="{ name: 'home' }"
        class="block h-[32px] w-[115px] bg-logo-lg bg-no-repeat"
      />

      <div class="text-right">hello</div>
      <section
        class="col-span-2 mt-[45px] grid h-fit min-h-[80px] grid-cols-3 items-center rounded-lg bg-white px-[32px]"
      >
        <MultiSelect />
      </section>
    </header>
    <section></section>
    <footer></footer>
  </main>
</template>
