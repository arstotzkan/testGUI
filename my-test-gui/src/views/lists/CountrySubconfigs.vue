<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {getOrganizationCountryConfigs} from "../../services/userServices.js";

const countrySubconfigs = ref([]);
const route = useRoute();
const id = route.query.id

onMounted(async () => {
  try {
    const response = await getOrganizationCountryConfigs(id);
    countrySubconfigs.value = response.data;
  } catch (err) {
    countrySubconfigs.value = [];
  } 
});
</script>

<template>
  <div class="card-body">
    <h3>
      Subconfigurations of {{organization}}:
    </h3>
    <hr>
    <ul v-if="countrySubconfigs.length">
      <li v-for="countryConfig in countrySubconfigs">
        <RouterLink 
          :to="`/check-organization-country-config?id=${countryConfig.id}`" 
          class="card-text"
        >
          {{ countryConfig.name }} - {{countryConfig.country}}
        </RouterLink >
      </li>
    </ul>
    <span v-else> No configurations added</span>
    <hr>
    <div class="d-flex justify-content-between">
      <RouterLink :to="'/'"> Go back </RouterLink>
      <RouterLink :to="'/'"> Create Country Configuration [TODO] </RouterLink>
      <RouterLink :to="`/update-organization-config?id=${id}`"> Edit Organization Configuration </RouterLink>
    </div>
  </div>
</template>