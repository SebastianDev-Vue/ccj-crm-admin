<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FormKit } from '@formkit/vue'

import RouterLink from '@/components/UI/RouterLink.vue'
import Heading from '@/components/UI/HeadingComponent.vue'
import ClientService from '@/services/ClientService'
import type { Client } from '@/interfaces/interfaces'

defineProps<{ title: string }>()

const route = useRoute()
const router = useRouter()
const { id } = route.params

const formData = reactive<Client>({
  name: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  position: ''
})

onMounted(async () => {
  try {
    const { data } = await ClientService.getClient(id)
    Object.assign(formData, data)
  } catch (error) {
    console.error(error)
  }
})

const handleSubmit = async (data: Client) => {
  try {
    await ClientService.updateClient(id, data)
    router.push({ name: 'home' })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="home">Home</RouterLink>
    </div>

    <Heading>{{ title }}</Heading>

    <div class="mx-auto mt-10 bg-white shadow">
      <div class="mx-auto md:w-2/3 py-20 px-6 w-full">
        <FormKit
          type="form"
          submit-label="Edit Client"
          incomplete-message="Could not create the client, check the messages"
          @submit="handleSubmit"
        >
          <FormKit
            type="text"
            label="Name"
            name="name"
            placeholder="Client Name"
            validation="required"
            v-model="formData.name"
          />

          <FormKit
            type="text"
            label="Last Name"
            name="lastName"
            placeholder="Client Last Name"
            validation="required"
            v-model="formData.lastName"
          />

          <FormKit
            type="email"
            label="Email"
            name="email"
            placeholder="Client Email"
            validation="required|email"
            v-model="formData.email"
          />
          <FormKit
            type="text"
            label="Phone"
            name="phone"
            placeholder="Phone: XXX-XXX-XXXX"
            validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
            :validation-messages="{ matches: 'Format Invalid' }"
            v-model="formData.phone"
          />

          <FormKit
            type="text"
            label="Company"
            name="company"
            placeholder="Client Company"
            v-model="formData.company"
          />

          <FormKit
            type="text"
            label="Position"
            name="position"
            placeholder="Client Position"
            v-model="formData.position"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style>
.formkit-wrapper {
  max-width: 100%;
}
</style>
