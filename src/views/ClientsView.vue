<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import ClientService from '@/services/ClientService'

import RouterLink from '@/components/UI/RouterLink.vue'
import Heading from '@/components/UI/HeadingComponent.vue'
import ClientComponent from '@/components/ClientComponent.vue'

import type { Client } from '../interfaces/interfaces'

defineProps<{ title: string }>()

const clients = ref<Client[]>([])

onMounted(async () => {
  try {
    const { data } = await ClientService.getClients()
    clients.value = data
  } catch (error) {
    console.error(error)
  }
})

const clientsExists = computed(() => {
  return clients.value.length > 0
})

const updateClientState = async (id: number, status: boolean) => {
  try {
    const clientIndex = clients.value.findIndex((client) => client.id === id)
    clients.value[clientIndex].status = !status

    await ClientService.changeClientStatus(id, { status: !status })
  } catch (error) {
    console.error(error)
  }
}

const deleteClient = async (id: number) => {
  try {
    await ClientService.deleteClient(id)

    clients.value = clients.value.filter((client) => client.id !== id)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="new-client"> New Client </RouterLink>
    </div>

    <Heading>{{ title }}</Heading>

    <div v-if="clientsExists" class="flow-root mx-auto mt-10 p-5 bg-white shadow">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Name</th>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">
                  Company
                </th>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">
                  Status
                </th>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <ClientComponent
                v-for="client in clients"
                :key="client.id"
                :client="client"
                @update-client-status="updateClientState"
                @delete-client="deleteClient"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <p v-else class="text-center mt-10">No hay clientes</p>
  </div>
</template>
