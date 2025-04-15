<script setup>
  import { onMounted, ref } from 'vue';
  import LocationConfigForm from "../../components/LocationConfigForm.vue";
  import { useRoute } from 'vue-router';
  import {getLocationConfig, updateLocationConfig} from "../../services/userServices.js";

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

  
  const handleSubmit = async () => {
    try {
      const result = await updateLocationConfig(config.value)
      console.log('Posted successfully:', result)
    } catch (err) {
      console.error('Failed to post:', err)
    }
  }

</script>

<template>
  <div class="card-body">
    <h3>
      Update Configuration of {{config.location}}:
    </h3>
    <hr>
    <form @submit.prevent="handleSubmit">
      <LocationConfigForm v-model="config" />
      <hr>
      <div class="d-flex justify-content-between">
        <a href="" @click="$router.back()">Go Back </a>
        <button class="btn btn-primary" type="submit"> Update [TODO MESSAGE]</button>
      </div>
    </form>
  </div>
</template>
