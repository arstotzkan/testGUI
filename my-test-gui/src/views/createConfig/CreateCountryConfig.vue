<script setup>
  import { onMounted, ref } from 'vue';
  import CountryConfigForm from "../../components/CountryConfigForm.vue";
  import { useRoute } from 'vue-router';
  import {getOrganizationConfig, createCountryConfig} from "../../services/userServices.js";

  const route = useRoute();
  const parent = route.query.parent
  const success = ref(false);
  const error = ref(null); 
  const config = ref({
    id: null,
    country: '',
    title: '',
    favourite_brand: '',
    main_button_text: '',
    help_url: '',
    help_text: '',
    organization_configuration_id: parent,
  });

  onMounted(async () => {
    try {
      const response = await getOrganizationConfig(parent);
      const parentConfig = response.data[0];
      config.value = {
        ...config.value,
        title: parentConfig.title,
        favourite_brand: parentConfig.favourite_brand,
        main_button_text: parentConfig.main_button_text,
        help_url: parentConfig.help_url,
        help_text: parentConfig.help_text,
      };
    } catch (err) {} 
  });

  
  const handleSubmit = async () => {
    success.value = false
    error.value = null

    try {
      const result = await createCountryConfig(config.value)
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
      Create country configuration
    </h3>
    <hr>
    <form @submit.prevent="handleSubmit">
      <CountryConfigForm v-model="config" />
      <hr>
      <div class="d-flex justify-content-between">
        <RouterLink :to="`/check-organization-config?id=${parent}`"> Go back </RouterLink>
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
