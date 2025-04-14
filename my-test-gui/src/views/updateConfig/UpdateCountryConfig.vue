<script setup>
  import { onMounted, ref } from 'vue';
  import CountryConfigForm from "../../components/CountryConfigForm.vue";
  import { useRoute } from 'vue-router';
  import {getCountryConfig} from "../../services/userServices.js";

  const route = useRoute();
  const organization = route.query.org
  const country = route.query.country

  const config = ref({});
  onMounted(async () => {
    try {
      const response = await getCountryConfig(organization, country);
      config.value = response.data;
    } catch (err) {
      config.value = {};
    } 
  });
</script>

<template>
  <div class="card-body">
    <h3>
      Update Configuration of {{organization}} - {{country}}:
    </h3>
    <hr>
    <CountryConfigForm :config="config" />
    <hr>
    <div class="d-flex justify-content-between">
      <a href="" @click="$router.go(-1)">Go Back </a>
      <a href=""> Update [TODO]</a>
    </div>
  </div>
</template>
