<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>{{ isEdit ? 'Edit' : 'Add' }} Product</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="form.title" label="Title" required />
          <v-text-field v-model="form.price" label="Price" type="number" required />
          <v-combobox
            v-model="form.category"
            :items="categoriesList"
            label="Category"
            required
            clearable
            placeholder="Select or create category"
            hide-selected
            prepend-icon="mdi-format-list-bulleted"
            >
           </v-combobox>
          <v-text-field v-model="form.image" label="Image URL" />
          <v-textarea v-model="form.description" label="Description" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="submitForm" color="primary">{{ isEdit ? 'Update' : 'Add' }}</v-btn>
        <v-btn @click="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits} from 'vue'

const emit = defineEmits(['submit'])

const dialog = ref(false)
const form = ref({ title: '', price: '', category: '', image: '', description: '' })
const isEdit = ref(false)

const props = defineProps({
  product: Object,
  show: Boolean,
  categories: Array
})

const categoriesList = ref([])

watch(() => props.categories, (newVal) => {
  if (Array.isArray(newVal)) {
    categoriesList.value = [...new Set(newVal)]
  }
}, { immediate: true })

watch(() => props.product, (val) => {
  if (val) {
    isEdit.value = true
    dialog.value = true
    form.value = { ...val }
  }
})

watch(() => props.show, (val) => {
  if (val && !props.product) {
    isEdit.value = false
    form.value = { title: '', price: '', category: '', image: '', description: '' }
    dialog.value = true
  }
})

const submitForm = () => {
  emit('submit', { ...form.value, id: props.product?.id })
  dialog.value = false
}
</script>
