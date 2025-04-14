<script setup>
  import { useRoute } from 'vue-router';
  import OrganizationConfigForm from "../../components/OrganizationConfigForm.vue";

  const route = useRoute();
  const organization = route.query.org
</script>

<template>
  <div class="card-body">
    <h3>
      Update Configuration of {{organization}}:
    </h3>
    <hr>
    <OrganizationConfigForm/>
    <hr>
    <div class="d-flex justify-content-between">
      <a href="" @click="$router.go(-1)">Go Back </a>
      <a href=""> Update [TODO]</a>
    </div>
  </div>
</template>
