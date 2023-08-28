<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import type { Client } from '@/interfaces/interfaces'

const props = defineProps<{ client: Client }>()

const emits = defineEmits<{
  updateClientStatus: [id: number, status: boolean]
  deleteClient: [id: number]
}>()

const clientFullName = computed(() => {
  return `${props.client.name} ${props.client.lastName}`
})

const clientStatus = computed(() => {
  return props.client.status
})
</script>

<template>
  <tr>
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
      <p class="font-medium text-gray-900">{{ clientFullName }}</p>
      <p class="text-gray-500">{{ client.email }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <p class="text-gray-900 font-bold">{{ client.company }}</p>
      <p class="text-gray-600">{{ client.position }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm">
      <button
        @click="
          client.id !== undefined &&
            client.status !== undefined &&
            emits('updateClientStatus', client.id, client.status)
        "
        class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
        :class="[clientStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']"
      >
        {{ clientStatus ? 'Active' : 'Inactive' }}
      </button>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <RouterLink
        :to="{ name: 'edit-client', params: { id: client.id } }"
        class="text-indigo-600 hover:text-indigo-900 mr-5 transition-colors ease-in-out duration-300"
        >Edit</RouterLink
      >
      <button
        @click="client.id && emits('deleteClient', client.id)"
        class="text-red-500 hover:text-red-600 transition-colors ease-in-out duration-300"
      >
        Delete
      </button>
    </td>
  </tr>
</template>
