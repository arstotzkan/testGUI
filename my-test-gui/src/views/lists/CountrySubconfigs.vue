<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  getOrganizationConfig,
  getOrganizationCountryConfigs,
} from '../../services/userServices.js'

const countrySubconfigs = ref([])
const currentConfigName = ref('')
const route = useRoute()
const id = route.query.id

onMounted(async () => {
  try {
    const response = await getOrganizationCountryConfigs(id)
    countrySubconfigs.value = response.data
  } catch (err) {
    countrySubconfigs.value = []
    console.error(err)
  }

  try {
    const currentConfig = await getOrganizationConfig(id)
    currentConfigName.value = currentConfig.data[0].organization
  } catch (err) {
    currentConfigName.value = 'N/A'
    console.error(err)
  }
})
</script>

<template>
  <div class="card-body">
    <h3>Subconfigurations of {{ currentConfigName }}</h3>
    <hr />
    <ul v-if="countrySubconfigs.length">
      <li v-for="countryConfig in countrySubconfigs" :key="countryConfig.id">
        <RouterLink
          :to="`/check-organization-country-config?id=${countryConfig.id}`"
          class="card-text"
        >
          {{ countryConfig.country }}
        </RouterLink>
      </li>
    </ul>
    <span v-else> No configurations added</span>
    <hr />
    <div class="d-flex justify-content-end">
      <RouterLink class="btn btn-secondary mx-2" :to="'/'"> Go back </RouterLink>
      <RouterLink
        class="btn btn-primary mx-2"
        :to="`/create-organization-country-config?parent=${id}`"
      >
        Create Country Configuration
      </RouterLink>
      <RouterLink class="btn btn-primary mx-2" :to="`/update-organization-config?id=${id}`">
        Edit Organization Configuration
      </RouterLink>
    </div>
  </div>
</template>
