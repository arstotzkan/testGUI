<script setup>
import { reactive, watch } from 'vue'
const props = defineProps({
  modelValue: Object,
})

const emit = defineEmits(['update:modelValue'])

const form = reactive({
  id: '',
  location: '',
  title: '',
  favourite_brand: '',
  main_button_text: '',
  help_url: '',
  help_text: '',
})

watch(
  () => props.modelValue,
  (newConfig) => {
    if (newConfig) {
      Object.assign(form, newConfig)
    }
  },
  { immediate: true },
)

watch(
  form,
  (newForm) => {
    emit('update:modelValue', newForm)
  },
  { deep: true },
)
</script>

<template>
  <div>
    <div class="form-group mb-2">
      <label for="location">Location</label>
      <input class="form-control" id="location" v-model="form.location" required />
    </div>

    <div class="form-group mb-2">
      <label for="title">Title</label>
      <input class="form-control" id="title" v-model="form.title" />
    </div>

    <div class="form-group mb-2">
      <label for="favouriteBrand">Favourite Brand</label>
      <input class="form-control" id="favouriteBrand" v-model="form.favourite_brand" />
    </div>

    <div class="form-group mb-2">
      <label for="mainButtonText">Main button text</label>
      <input class="form-control" id="mainButtonText" v-model="form.main_button_text" />
    </div>

    <div class="form-group mb-2">
      <label for="helpURL">Help URL</label>
      <input class="form-control" id="helpURL" v-model="form.help_url" />
    </div>

    <div class="form-group">
      <label for="helpText">Help Text</label>
      <input class="form-control" id="helpText" v-model="form.help_text" />
    </div>
  </div>
</template>
