<script setup>
import { onMounted, ref } from 'vue';
import {getOrganizations} from "../../services/userServices.js"
const organizations = ref([]);

onMounted(async () => {
  try {
    const response = await getOrganizations();
    organizations.value = response.data;
  } catch (err) {
    organizations.value = [];
  } 
});
</script>

<template>
  <div class="card-body">
    <h3>
      Organizations:
    </h3>
    <hr>
    <ul>
      <li v-for="org in organizations">
        <RouterLink :to="`/check-organization-config?org=${org.name}`" class="card-text">{{ org.name }}</RouterLink >
      </li>
    </ul>
    <hr>
    <div class="d-flex justify-content-between">
      <RouterLink :to="'/'"> Create Organization Configuration [TODO] </RouterLink>
    </div>
  </div>
</template>