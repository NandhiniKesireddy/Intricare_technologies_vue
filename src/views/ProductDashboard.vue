<template>
  <v-container fluid class="mt-5">
    <h1 class="text-h4 mb-6 text-center" style="color:#a0498f">
      Explore Our Products
    </h1>
    <v-row>
      <ProductCard
        v-for="item in filteredProducts"
        :key="item.id"
        :product="item"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </v-row>
    <v-row class="mb-4">
      <v-col cols="12" md="4" offset-md="8" class="text-right">
        <ProductForm 
          :product="editable"
          :show="showFormDialog"
          :categories="categories"
          @submit="handleFormSubmit"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed, defineProps, defineEmits, onBeforeMount } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import ProductForm from '@/components/ProductForm.vue'
import {
  fetchProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  fetchCategories,
} from '@/services/app.js'

const props = defineProps(['search', 'selectedCategory', 'categories'])
const emit = defineEmits(['update-categories'])

const products = ref([])
const editable = ref(null)
const showFormDialog = ref(false)

const openAddForm = () => {
  editable.value = null
  showFormDialog.value = true
}

onBeforeMount(() => {
  window.addEventListener('open-add-form', openAddForm)
})

onMounted(() => {
  getProducts()
  getCategories()
})

const getProducts = async () => {
  const res = await fetchProducts()
  products.value = res.data
}

const getCategories = async () => {
  const res = await fetchCategories()
  emit('update-categories', [...new Set(res.data)])
}

const handleFormSubmit = async (data) => {
  if (data.id) await handleUpdate(data)
  else await handleAdd(data)
  showFormDialog.value = false
  editable.value = null
}

const handleAdd = async (data) => {
  let uniqueId = Date.now()
  while (products.value.some(p => p.id === uniqueId)) {
    uniqueId += Math.floor(Math.random() * 1000)
  }
  const newProduct = { ...data, id: uniqueId }
  await addProduct(newProduct)
  products.value.push(newProduct)
  if (!props.categories.includes(data.category)) {
    emit('update-categories', [...props.categories, data.category])
  }
}

const handleEdit = (product) => {
  editable.value = { ...product }
  showFormDialog.value = true
}

const handleUpdate = async (data) => {
  const res = await updateProduct(data.id, data)
  const index = products.value.findIndex(p => p.id === data.id)
  if (index !== -1) products.value[index] = res.data
}

const handleDelete = async (id) => {
  await deleteProduct(id)
  products.value = products.value.filter(p => p.id !== id)
}

const filteredProducts = computed(() => {
  let filtered = [...products.value]
  if (props.search)
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(props.search.toLowerCase()))
  if (props.selectedCategory?.length)
    filtered = filtered.filter((p) => props.selectedCategory.includes(p.category))
  return filtered
})
</script>

