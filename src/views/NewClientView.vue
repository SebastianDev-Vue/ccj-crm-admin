<script setup lang="ts">
import { useRouter } from 'vue-router'
import { FormKit } from '@formkit/vue'

import ClientService from '@/services/ClientService'

import RouterLink from '@/components/UI/RouterLink.vue'
import Heading from '@/components/UI/HeadingComponent.vue'

import type { Client } from '@/interfaces/interfaces'

defineProps<{ title: string }>()

const router = useRouter()

const handleSubmit = async (data: Client): Promise<void> => {
  try {
    data.status = true
    await ClientService.createClient(data)

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
          submit-label="Add Client"
          incomplete-message="Could not create the client, check the messages"
          @submit="handleSubmit"
        >
          <FormKit
            type="text"
            label="Name"
            name="name"
            placeholder="Client Name"
            validation="required"
          />

          <FormKit
            type="text"
            label="Last Name"
            name="lastName"
            placeholder="Client Last Name"
            validation="required"
          />

          <FormKit
            type="email"
            label="Email"
            name="email"
            placeholder="Client Email"
            validation="required|email"
          />
          <FormKit
            type="text"
            label="Phone"
            name="phone"
            placeholder="Phone: XXX-XXX-XXXX"
            validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
            :validation-messages="{ matches: 'Format Invalid' }"
          />

          <FormKit type="text" label="Company" name="company" placeholder="Client Company" />

          <FormKit type="text" label="Position" name="position" placeholder="Client Position" />
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
