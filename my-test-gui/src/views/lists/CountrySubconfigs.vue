<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {getOrganizationCountryConfigs} from "../../services/userServices.js";

const countrySubconfigs = ref([]);
const route = useRoute();
const organization = route.query.org

onMounted(async () => {
  try {
    const response = await getOrganizationCountryConfigs(organization);
    countrySubconfigs.value = response.data;
  } catch (err) {
    countrySubconfigs.value = [{"name": "lol", "country": "la"}];
  } 
});
</script>

<template>
  <div class="card-body">
    <h3>
      Subconfigurations of {{organization}}:
    </h3>
    <hr>
    <ul>
      <li v-for="countryConfig in countrySubconfigs">
        <RouterLink 
          :to="`/check-organization-country-config?org=${countryConfig.name}&country=${countryConfig.country}`" 
          class="card-text"
        >
          {{ countryConfig.name }} - {{countryConfig.country}}
        </RouterLink >
      </li>
    </ul>
    <hr>
    <div class="d-flex justify-content-between">
      <RouterLink :to="'/'"> Go back </RouterLink>
      <RouterLink :to="'/'"> Create Country Configuration [TODO] </RouterLink>
      <RouterLink :to="`/update-organization-config?org=${organization}`"> Edit Organization Configuration </RouterLink>
    </div>
  </div>
</template>