import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])
  const itemAmount = computed(() => cart.value.reduce((sum, item) => sum + item.amount, 0))
  const total = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.amount, 0))

  function addToCart(product) {
    const existing = cart.value.find(i => i.id === product.id)
    if (existing) existing.amount++
    else cart.value.push({ ...product, amount: 1 })
  }

  function removeFromCart(id) {
    cart.value = cart.value.filter(i => i.id !== id)
  }

  function clearCart() {
    cart.value = []
  }

  function increaseAmount(id) {
    const item = cart.value.find(i => i.id === id)
    if (item) item.amount++
  }

  function decreaseAmount(id) {
    const item = cart.value.find(i => i.id === id)
    if (item && item.amount > 1) item.amount--
    else removeFromCart(id)
  }

  return { cart, itemAmount, total, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount }
})
