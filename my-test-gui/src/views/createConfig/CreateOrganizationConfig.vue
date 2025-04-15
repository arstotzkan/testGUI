<script setup>
import { ref } from 'vue'
import OrganizationConfigForm from '../../components/OrganizationConfigForm.vue'
import { createOrganizationConfig } from '../../services/userServices.js'

const success = ref(false)
const error = ref(null)
const config = ref({
  id: null,
  organization: '',
  title: '',
  favourite_brand: '',
  main_button_text: '',
  help_url: '',
  help_text: '',
})

const handleSubmit = async () => {
  success.value = false
  error.value = null

  if (!config.value.country){
    error.value = "Add country value"
    return
  }
  
  try {
    const result = await createOrganizationConfig(config.value)
    console.log('Posted successfully:', result)
    success.value = true
  } catch (err) {
    console.error('Failed to post:', err)
    error.value = err.message
  }
}
</script>

<template>
  <div class="card-body">
    <h3>Create organization configuration</h3>
    <hr />
    <form @submit.prevent="handleSubmit()">
      <OrganizationConfigForm v-model="config" />
      <hr />
      <div class="d-flex justify-content-end">
        <RouterLink class="btn btn-secondary mx-2" :to="'/'"> Go back </RouterLink>
        <button class="btn btn-primary mx-2" type="submit">Create</button>
      </div>
      <div v-if="success" class="alert alert-success text-center my-2" role="alert">
        Configuration created
      </div>
      <div v-if="error" class="alert alert-danger text-center my-2" role="alert">
        {{ error }}
      </div>
    </form>
  </div>
</template>
