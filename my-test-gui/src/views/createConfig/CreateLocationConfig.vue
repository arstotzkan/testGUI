<script setup>
  import { onMounted, ref } from 'vue';
  import LocationConfigForm from "../../components/LocationConfigForm.vue";
  import { useRoute } from 'vue-router';
  import {getLocationConfig, createLocationConfig} from "../../services/userServices.js";

  const route = useRoute();
  const parent = route.query.parent
  const success = ref(false);
  const error = ref(null); 
    const config = ref({
    id: null,
    location: '',
    title: '',
    favourite_brand: '',
    main_button_text: '',
    help_url: '',
    help_text: '',
    country_configuration_id: parent,
  });

  onMounted(async () => {
    try {
      const response = await getLocationConfig(id);
      config.value = response.data[0];
    } catch (err) {
      config.value = {};
    } 
  });

  
  const handleSubmit = async () => {
    success.value = false
    error.value = null

    try {
      const result = await createLocationConfig(config.value)
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
    <h3>
      Create location configuration
    </h3>
    <hr>
    <form @submit.prevent="handleSubmit">
      <LocationConfigForm v-model="config" />
      <hr>
      <div class="d-flex justify-content-between">
        <a href="" @click="$router.back()">Go Back </a>
        <button class="btn btn-primary" type="submit">Create</button>
      </div>
      <div v-if="success" class="alert alert-success text-center my-2" role="alert">
        Configuration created
      </div>
      <div v-if="error" class="alert alert-danger text-center my-2" role="alert">
        {{error}}
      </div>
    </form>
  </div>
</template>
