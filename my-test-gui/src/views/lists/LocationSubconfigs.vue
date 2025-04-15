<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {getCountryLocationConfigs} from "../../services/userServices.js"

const locationSubconfigs = ref([]);
const route = useRoute();
const id = route.query.id

onMounted(async () => {
  try {
    const response = await getCountryLocationConfigs();
    locationSubconfigs.value = response.data;
  } catch (err) {
    locationSubconfigs.value = [];
  } 
});
</script>

<template>
  <div class="card-body">
    <h3>
      Subconfigurations of {{organization}} in {{country}}:
    </h3>
    <hr>
    <ul v-if="locationSubconfigs.length">
      <li v-for="locationConfig in locationSubconfigs">
        <RouterLink 
          :to="`/update-organization-location-config?org=${locationConfig.name}&country=${locationConfig.country}&loc=${locationConfig.location}`" 
          class="card-text"
        >
          {{ locationConfig.name }} - {{locationConfig.country}} - {{locationConfig.location}}
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