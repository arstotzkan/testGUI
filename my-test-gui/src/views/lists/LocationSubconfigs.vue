<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {getCountryLocationConfigs} from "../../services/userServices.js"

const locationSubconfigs = ref([]);
const route = useRoute();
const organization = route.query.org
const country = route.query.country

onMounted(async () => {
  try {
    const response = await getCountryLocationConfigs();
    locationSubconfigs.value = response.data;
  } catch (err) {
    locationSubconfigs.value = [{"name": "lol", "country": "la"}];
  } 
});
</script>

<template>
  <div class="card-body">
    <h3>
      Subconfigurations of {{organization}} in {{country}}:
    </h3>
    <hr>
    <ul>
      <li v-for="locationConfig in locationSubconfigs">
        <RouterLink 
          :to="`/update-organization-location-config?org=${locationConfig.name}&country=${locationConfig.country}&loc=${locationConfig.location}`" 
          class="card-text"
        >
          {{ locationConfig.name }} - {{locationConfig.country}} - {{locationConfig.location}}
        </RouterLink >
      </li>
    </ul>
    <hr>
    <div class="d-flex justify-content-between">
      <RouterLink :to="`/check-organization-config?org=${organization}`"> Go back </RouterLink>
      <RouterLink :to="'/'"> Create Location Configuration [TODO] </RouterLink>
      <RouterLink :to="`/update-organization-country-config?org=${organization}&country=${country}`"> Edit Organization Country Configuration</RouterLink>
    </div>
  </div>
</template>