<script setup>
import { onMounted, ref } from 'vue'
import { getOrganizations } from '../../services/userServices.js'
const organizations = ref([])

onMounted(async () => {
  try {
    const response = await getOrganizations()
    organizations.value = response.data
  } catch (err) {
    organizations.value = []
    console.error(err)
  }
})
</script>

<template>
  <div class="card-body">
    <h3>Organizations</h3>
    <hr />
    <ul v-if="organizations.length">
      <li v-for="org in organizations" :key="org.id">
        <RouterLink :to="`/check-organization-config?id=${org.id}`" class="card-text">{{
          org.organization
        }}</RouterLink>
      </li>
    </ul>
    <span v-else> No configurations added</span>
    <hr />
    <div class="d-flex justify-content-end">
      <RouterLink class="btn btn-primary mx-2" :to="'/create-organization-config'">
        Create Organization Configuration</RouterLink
      >
    </div>
  </div>
</template>
