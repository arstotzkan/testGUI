<script setup>
import { ref, computed } from 'vue'
import CheckSubconfigs from './components/CheckSubconfigs.vue'
import Preview from './components/Preview.vue'
import NotFound from './components/NotFound.vue'
import UpdateConfig from './components/UpdateConfig.vue'

const routes = {
  '/': CheckSubconfigs,
  'check-subconfig': CheckSubconfigs,
  'update-config': UpdateConfig,
  'preview': Preview
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || "/"] || NotFound
})

</script>

<template>
  <div class="container">
    <div class="card my-3 p-2">
      <component :is="currentView" />
    </div>
  </div>
</template>

