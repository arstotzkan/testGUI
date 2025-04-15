<script setup>
  import { onMounted, ref } from 'vue';
  import LocationConfigForm from "../../components/LocationConfigForm.vue";
  import { useRoute } from 'vue-router';
  import {getLocationConfig} from "../../services/userServices.js";

  const route = useRoute();
  const id = route.query.id
  
    
  const config = ref({});
  onMounted(async () => {
    try {
      const response = await getLocationConfig(id);
      config.value = response.data[0];
    } catch (err) {
      config.value = {};
    } 
  });

</script>

<template>
  <div class="card-body">
    <h3>
      Update Configuration of {{config.location}}:
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
