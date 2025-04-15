<script setup>
import { reactive, toRefs, watch } from 'vue'
const props = defineProps({
  config: Object
})

// Create a reactive copy of config to bind to form inputs
const form = reactive({
  id: '',
  location: '',
  title: '',
  favourite_brand: '',
  main_button_text: '',
  help_url: '',
  help_text: ''
})

// Watch for props.config updates and sync values
watch(() => props.config, (newConfig) => {
      if (newConfig) {
        Object.assign(form, newConfig)
      }
    }, {immediate: true}
)
</script>

<template>
  <form>
    <div class="form-group mb-2">
      <label for="location">Location</label>
      <input class="form-control" id="location"  v-model="form.location">
    </div>

    <div class="form-group mb-2">
      <label for="title">Title</label>
      <input class="form-control" id="title" v-model="form.title">
    </div>

    <div class="form-group mb-2">
      <label for="favouriteBrand">Favourite Brand</label>
      <input class="form-control" id="favouriteBrand" v-model="form.favourite_brand">
    </div>

    <div class="form-group mb-2">
      <label for="mainButtonText">Main button text</label>
      <input class="form-control" id="mainButtonText" v-model="form.main_button_text">
    </div>

    <div class="form-group mb-2">
      <label for="helpURL">Help URL</label>
      <input class="form-control" id="helpURL" v-model="form.help_url">
    </div>

    <div class="form-group">
      <label for="helpText">Help Text</label>
      <input class="form-control" id="helpText" v-model="form.help_text">
    </div>
  </form>
</template>