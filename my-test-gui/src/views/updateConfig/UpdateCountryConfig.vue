<script setup>
  import CountryConfigForm from "../../components/CountryConfigForm.vue";
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const organization = route.query.org
  const country = route.query.country
</script>

<template>
  <div class="card-body">
    <h3>
      Update Configuration of {{organization}} - {{country}}:
    </h3>
    <hr>
    <CountryConfigForm/>
    <hr>
    <div class="d-flex justify-content-between">
      <a href="" @click="$router.go(-1)">Go Back </a>
      <a href=""> Update [TODO]</a>
    </div>
  </div>
</template>
