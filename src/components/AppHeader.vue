<!-- eslint-disable no-unused-vars -->
<template>
  <v-app-bar
    app
    height="64"
    style="background-color: rgb(182, 121, 142);"
  >
    <RouterLink to="/" class="text-decoration-none">
        <v-toolbar-title class="text-white cursor-pointer pl-2">
            🛍️ Nayaa Fashions Dashboard
        </v-toolbar-title>
    </RouterLink>

    <v-spacer />

    <v-text-field
      v-model="search"
      prepend-inner-icon="mdi-magnify"
      density="compact"
      variant="solo"
      clearable
      hide-details
      single-line
      placeholder="Search by Title"
      style="max-width: 650px;"
      @input="$emit('update:search', search)"
      @click:clear="onClear"
    />

    <v-select
      v-model="selectedCategory"
      :items="categories"
      variant="solo"
      density="compact"
      multiple
      chips
      clearable
      hide-details
      single-line
      placeholder="Filter by Category"
      style="max-width: 350px; margin-left: 16px;"
      @update:modelValue="$emit('update:category', selectedCategory)"
    />

    <v-btn
        class="ml-4"
        style="background-color: #8E3D5B; color: white;"
        @click="$emit('add-product')"
        >
        Add Product
    </v-btn>

    <v-btn icon @click="sidebar.toggle" color="white">
        <v-badge :content="cart.itemAmount" color="#8E3D5B" overlap>
            <v-icon>mdi-cart</v-icon>
        </v-badge>
    </v-btn>

  </v-app-bar>
</template>


<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue'
import { useCartStore } from '../store/cart'
import { useSidebarStore } from '../store/sidebar'
// import { useProductsStore } from '../store/products'

const cart = useCartStore()
const sidebar = useSidebarStore()
// const store = useProductsStore()

const props = defineProps({
  modelValue: String,
  category: Array, // 💡 Accept array for multiple categories
  categories: Array,
})

// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['update:search', 'update:category', 'add-product'])

const search = ref(props.modelValue || '')
const selectedCategory = ref(props.category || [])

const onClear = () => {
  search.value = ''
  emit('update:search', '')
}

watch(() => props.modelValue, (val) => {
  search.value = val
})

watch(() => props.category, (val) => {
  selectedCategory.value = val
})
</script>

