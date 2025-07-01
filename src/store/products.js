import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])

  async function load() {
    const res = await fetch('https://fakestoreapi.com/products')
    products.value = await res.json()
  }

  onMounted(load)
  return { products }
})