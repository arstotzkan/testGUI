<script setup>
  import { onMounted, ref } from 'vue';
  import LocationConfigForm from "../../components/LocationConfigForm.vue";
  import { useRoute } from 'vue-router';
  import {getLocationConfig} from "../../services/userServices.js";

  const route = useRoute();
  const organization = route.query.org
  const country = route.query.country
  const location = route.query.loc
  
    
  const config = ref({});
  onMounted(async () => {
    try {
      const response = await getLocationConfig(organization, country, location);
      config.value = response.data;
    } catch (err) {
      config.value = {};
    } 
  });

</script>

<template>
  <div class="card-body">
    <h3>
      Update Configuration of {{organization}} - {{country}} - {{location}}:
    </h3>
    <hr>
    <LocationConfigForm :config="config" />
    <hr>
    <div class="d-flex justify-content-between">
      <a href="" @click="$router.go(-1)">Go Back </a>
      <a href=""> Update [TODO]</a>
    </div>
  </div>
</template>
