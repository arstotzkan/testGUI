<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getCountryConfig, getCountryLocationConfigs } from '../../services/userServices.js'

const locationSubconfigs = ref([])
const currentConfigName = ref('')
const route = useRoute()
const id = route.query.id
const goBackLink = ref('')

onMounted(async () => {
  try {
    const response = await getCountryLocationConfigs(id)
    locationSubconfigs.value = response.data
  } catch (err) {
    locationSubconfigs.value = []
    console.error(err)
  }

  try {
    const currentConfig = await getCountryConfig(id)
    currentConfigName.value = currentConfig.data[0].country
    goBackLink.value = `/check-organization-config?id=${currentConfig.data[0].organization_configuration_id}`
  } catch (err) {
    currentConfigName.value = 'N/A'
    goBackLink.value = '/'
    console.error(err)
  }
})
</script>

<template>
  <div class="card-body">
    <h3>Subconfigurations of {{ currentConfigName }}</h3>
    <hr />
    <ul v-if="locationSubconfigs.length">
      <li v-for="locationConfig in locationSubconfigs" :key="locationConfig.id">
        <RouterLink
          :to="`/update-organization-location-config?id=${locationConfig.id}`"
          class="card-text"
        >
          {{ locationConfig.location }}
        </RouterLink>
      </li>
    </ul>
    <span v-else> No configurations added</span>
    <hr />
    <div class="d-flex justify-content-end">
      <RouterLink class="btn btn-secondary mx-2" :to="`${goBackLink}`"> Go back </RouterLink>
      <RouterLink
        class="btn btn-primary mx-2"
        :to="`/create-organization-location-config?parent=${id}`"
      >
        Create Location Configuration</RouterLink
      >
      <RouterLink class="btn btn-primary mx-2" :to="`/update-organization-country-config?id=${id}`">
        Edit Organization Country Configuration ({{currentConfigName}})</RouterLink
      >
    </div>
  </div>
</template>
