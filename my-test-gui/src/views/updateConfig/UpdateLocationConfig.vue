<script setup>
  import LocationConfigForm from "../../components/LocationConfigForm.vue";
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const organization = route.query.org
  const country = route.query.country
  const location = route.query.loc

</script>

<template>
  <div class="card-body">
    <h3>
      Update Configuration of {{organization}} - {{country}} - {{location}}:
    </h3>
    <hr>
    <LocationConfigForm/>
    <hr>
    <div class="d-flex justify-content-between">
      <a href="" @click="$router.go(-1)">Go Back </a>
      <a href=""> Update [TODO]</a>
    </div>
  </div>
</template>
