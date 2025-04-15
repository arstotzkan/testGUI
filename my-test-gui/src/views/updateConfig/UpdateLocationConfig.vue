<script setup>
import { onMounted, ref } from 'vue'
import LocationConfigForm from '../../components/LocationConfigForm.vue'
import { useRoute } from 'vue-router'
import {
  getLocationConfig,
  updateLocationConfig,
  deleteLocationConfig,
} from '../../services/userServices.js'

const route = useRoute()
const id = route.query.id
const success = ref(false)
const error = ref(null)
const config = ref({})
const deleted = ref(false)

onMounted(async () => {
  try {
    const response = await getLocationConfig(id)
    config.value = response.data[0]
  } catch (err) {
    config.value = {}
    console.error(err)
  }
})

const handleSubmit = async (action) => {
  success.value = false
  error.value = null

  if (!config.value.location) {
    error.value = 'Add country value'
    return
  }

  if (action === 'submit') {
    await updateConfiguration()
  } else if (action === 'delete') {
    await deleteConfiguration()
  }
}

async function updateConfiguration() {
  try {
    const result = await updateLocationConfig(config.value)
    console.log('Posted successfully:', result)
    success.value = 'Configuration updated'
  } catch (err) {
    console.error('Failed to post:', err)
    error.value = err.message
  }
}

async function deleteConfiguration() {
  try {
    const result = await deleteLocationConfig(config.value.id)
    console.log('Posted successfully:', result)
    success.value = 'Configuration deleted'
    deleted.value = true
  } catch (err) {
    console.error('Failed to post:', err)
    error.value = err.message
  }
}
</script>

<template>
  <div class="card-body">
    <h3>Update location configuration</h3>
    <hr />
    <form @submit.prevent="handleSubmit('submit')">
      <LocationConfigForm v-model="config" />
      <hr />
      <div class="d-flex justify-content-end">
        <RouterLink
          class="btn btn-secondary mx-2"
          :to="`/check-organization-country-config?id=${config.country_configuration_id}`"
        >
          Go back
        </RouterLink>
        <button
          class="btn btn-primary mx-2"
          type="button"
          :disabled="deleted"
          @click="handleSubmit('submit')"
        >
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
