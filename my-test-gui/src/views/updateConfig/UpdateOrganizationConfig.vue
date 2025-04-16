<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import OrganizationConfigForm from '../../components/OrganizationConfigForm.vue'
import {
  getOrganizationConfig,
  updateOrganizationConfig,
  deleteOrganizationConfig,
} from '../../services/userServices.js'

const route = useRoute()
const id = route.query.id
const success = ref(false)
const error = ref(null)
const config = ref({})
const goBackLink = ref(`/check-organization-config?id=${id}`)
const deleted = ref(false)

onMounted(async () => {
  try {
    const response = await getOrganizationConfig(id)
    config.value = response.data[0]
  } catch (err) {
    config.value = {}
    console.error(err)
  }
})

const handleSubmit = async (action) => {
  success.value = false
  error.value = null

  if (!config.value.organization) {
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
    const result = await updateOrganizationConfig(config.value)
    console.log('Posted successfully:', result)
    success.value = 'Configuration updated'
  } catch (err) {
    console.error('Failed to post:', err)
    error.value = err.response.data?.error
  }
}

async function deleteConfiguration() {
  try {
    const result = await deleteOrganizationConfig(config.value.id)
    console.log('Posted successfully:', result)
    success.value = 'Configuration deleted'
    goBackLink.value = '/'
    deleted.value = true
  } catch (err) {
    console.error('Failed to post:', err)
    error.value = err.response.data?.error
  }
}
</script>

<template>
  <div class="card-body">
    <h3>Update Organization Configuration</h3>
    <hr />
    <form @submit.prevent="handleSubmit('submit')">
      <OrganizationConfigForm v-model="config" />
      <hr />
      <div class="d-flex justify-content-end">
        <RouterLink class="btn btn-secondary mx-2" :to="goBackLink"> Go back </RouterLink>
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
