<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {getCountryConfig, getCountryLocationConfigs} from "../../services/userServices.js"

const locationSubconfigs = ref([]);
const currentConfigName = ref("")
const route = useRoute();
const id = route.query.id

onMounted(async () => {
  try {
    const response = await getCountryLocationConfigs(id);
    locationSubconfigs.value = response.data;
  } catch (err) {
    locationSubconfigs.value = [];
  } 

  try {
    const currentConfig = await getCountryConfig(id);
    currentConfigName.value = currentConfig.data[0].country;
  } catch (err) {
    currentConfigName.value = "N/A";
  } 

});
</script>

<template>
  <div class="card-body">
    <h3>
      Subconfigurations of {{currentConfigName}}:
    </h3>
    <hr>
    <ul v-if="locationSubconfigs.length">
      <li v-for="locationConfig in locationSubconfigs">
        <RouterLink 
          :to="`/update-organization-location-config?id=${locationConfig.id}`" 
          class="card-text"
        >
          {{locationConfig.location}}
        </RouterLink >
      </li>
    </ul>
    <span v-else> No configurations added</span>
    <hr>
    <div class="d-flex justify-content-between">
      <RouterLink :to="`/check-organization-config?id=${id}`"> Go back </RouterLink>
      <RouterLink :to="'/'"> Create Location Configuration [TODO] </RouterLink>
      <RouterLink :to="`/update-organization-country-config?id=${id}`"> Edit Organization Country Configuration</RouterLink>
    </div>
  </div>
</template>