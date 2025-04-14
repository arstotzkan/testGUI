<script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import OrganizationConfigForm from "../../components/OrganizationConfigForm.vue";
  import {getOrganizationConfig} from "../../services/userServices.js";

  const route = useRoute();
  const organization = route.query.org
  
  const config = ref({});
  onMounted(async () => {
    try {
      const response = await getOrganizationConfig(organization);
      config.value = response.data;
    } catch (err) {
      config.value = {};
    } 
  });
</script>

<template>
  <div class="card-body">
    <h3>
      Update Configuration of {{organization}}:
    </h3>
    <hr>
    <OrganizationConfigForm :config="config" />
    <hr>
    <div class="d-flex justify-content-between">
      <a href="" @click="$router.go(-1)">Go Back </a>
      <a href=""> Update [TODO]</a>
    </div>
  </div>
</template>
