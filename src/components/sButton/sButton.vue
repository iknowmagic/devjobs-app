<script setup lang="ts"></script>

<template>
  <button class="group h-12 w-36">
    <div
      class="flex h-full flex-1 items-center justify-center rounded bg-indigo-500 py-4 px-8 group-hover:bg-indigo-400"
    >
      <p class="text-center text-base font-bold text-white"><slot /></p>
    </div>
  </button>
</template>
