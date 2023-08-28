<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps<{ to: string }>()
</script>

<template>
  <RouterLink
    class="block md:inline-block rounded bg-blue-600 py-2 px-3 text-white font-bold uppercase text-sm shadow hover:bg-blue-500 transition-colors ease-out duration-200"
    :to="{ name: props.to }"
  >
    <slot></slot>
  </RouterLink>
</template>

<style scoped></style>
