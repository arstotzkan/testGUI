<script setup>
import { onMounted, ref } from 'vue'
import CountryConfigForm from '../../components/CountryConfigForm.vue'
import { useRoute } from 'vue-router'
import {
  getCountryConfig,
  updateCountryConfig,
  deleteCountryConfig,
} from '../../services/userServices.js'

const route = useRoute()
const id = route.query.id
const success = ref(false)
const error = ref(null)
const config = ref({})
const goBackLink = ref(`/check-organization-country-config?id=${config.value.id}`)

onMounted(async () => {
  try {
    const response = await getCountryConfig(id)
    config.value = response.data[0]
  } catch (err) {
    config.value = {}
  }
})

const handleSubmit = async (action) => {
  success.value = false
  error.value = null

  if (action === 'submit') {
    await updateConfiguration()
  } else if (action === 'delete') {
    await deleteConfiguration()
  }
}

async function updateConfiguration() {
  try {
    const result = await updateCountryConfig(config.value)
    console.log('Posted successfully:', result)
    success.value = 'Configuration updated'
  } catch (err) {
    console.error('Failed to post:', err)
    error.value = err.message
  }
}

async function deleteConfiguration() {
  try {
    const result = await deleteCountryConfig(config.value.id)
    console.log('Posted successfully:', result)
    success.value = 'Configuration deleted'
    goBackLink.value = `/check-organization-config?id=${config.value.organization_configuration_id}`
  } catch (err) {
    console.error('Failed to post:', err)
    error.value = err.message
  }
}
</script>

<template>
  <div class="card-body">
    <h3>Update Configuration of {{ config.country }}</h3>
    <hr />
    <form @submit.prevent="handleSubmit('submit')">
      <CountryConfigForm v-model="config" />
      <hr />
      <div class="d-flex justify-content-end">
        <RouterLink class="btn btn-secondary mx-2" :to="goBackLink"> Go back </RouterLink>
        <button class="btn btn-primary mx-2" type="button" @click="handleSubmit('submit')">
          Update
        </button>
        <button class="btn btn-danger mx-2" type="button" @click="handleSubmit('delete')">
          Delete
        </button>
      </div>
      <div v-if="success" class="alert alert-success text-center my-2" role="alert">
        {{ success }}
      </div>
      <div v-if="error" class="alert alert-danger text-center my-2" role="alert">
        {{ error }}
      </div>
    </form>
  </div>
</template>
