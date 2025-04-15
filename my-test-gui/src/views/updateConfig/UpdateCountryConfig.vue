<script setup>
  import { onMounted, ref } from 'vue';
  import CountryConfigForm from "../../components/CountryConfigForm.vue";
  import { useRoute } from 'vue-router';
  import {getCountryConfig, updateCountryConfig} from "../../services/userServices.js";

  const route = useRoute();
  const id = route.query.id;
  const success = ref(false);
  const error = ref(null);
  const config = ref({});

  onMounted(async () => {
    try {
      const response = await getCountryConfig(id);
      config.value = response.data[0];
    } catch (err) {
      config.value = {};
    } 
  });

  const handleSubmit = async () => {
    success.value = false
    error.value = null

    try {
      const result = await updateCountryConfig(config.value)
      console.log('Posted successfully:', result)
      success.value = true
    } catch (err) {
      console.error('Failed to post:', err)
      error.value = err.message;
    }
  }

</script>

<template>
  <div class="card-body">
    <h3>
      Update Configuration of {{config.country}}
    </h3>
    <hr>
    <form @submit.prevent="handleSubmit">
      <CountryConfigForm v-model="config" />
      <hr>
      <div class="d-flex justify-content-end">
        <RouterLink class="btn btn-secondary mx-2" :to="`/check-organization-country-config?id=${config.id}`"> Go back </RouterLink>
        <button class="btn btn-primary mx-2" type="submit"> Update</button>
      </div>
      <div v-if="success" class="alert alert-success text-center my-2" role="alert">
        Configuration updated
      </div>
      <div v-if="error" class="alert alert-danger text-center my-2" role="alert">
        {{error}}
      </div>
    </form>
  </div>
</template>
