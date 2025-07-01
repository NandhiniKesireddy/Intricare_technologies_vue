<template>
  <div class="d-flex gap-x-4 py-2 px-2 border-b border-grey-light w-100 font-weight-light text-grey-darken-1">
    <div class="w-100 d-flex align-center gap-x-4">
      <RouterLink :to="`/product/${item.id}`">
        <img
          :src="item.image"
          alt="Product"
          style="max-width: 80px; border-radius: 4px"
        />
      </RouterLink>
      
      <div class="flex-grow-1 d-flex flex-column">
        <div class="d-flex justify-space-between mb-2">
          <RouterLink
            :to="`/product/${item.id}`"
            class="text-subtitle-2 text-primary font-weight-medium text-uppercase text-decoration-none hover:underline"
            style="max-width: 240px;"
          >
            {{ item.title }}
          </RouterLink>
          <v-btn icon size="x-small" @click="cart.removeFromCart(item.id)">
            <v-icon size="16" class="text-grey-darken-1 hover:text-red">mdi-close</v-icon>
          </v-btn>
        </div>

        <div class="d-flex gap-2 align-center text-body-2">
          <div class="d-flex border align-center" style="max-width: 100px; height: 36px;">
            <v-btn icon size="x-small" class="flex-grow-1" @click="cart.decreaseAmount(item.id)">
              <v-icon size="18">mdi-minus</v-icon>
            </v-btn>
            <div class="px-2 d-flex align-center justify-center">{{ item.amount }}</div>
            <v-btn icon size="x-small" class="flex-grow-1" @click="cart.increaseAmount(item.id)">
              <v-icon size="18">mdi-plus</v-icon>
            </v-btn>
          </div>

          <div class="flex-grow-1 text-center">$ {{ item.price }}</div>

          <div class="flex-grow-1 text-right text-primary font-weight-medium">
            $ {{ (item.price * item.amount).toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../store/cart'
import { defineProps } from 'vue'

const cart = useCartStore()

defineProps({ item: Object })
</script>

<style scoped>
.hover\:underline:hover {
  text-decoration: underline;
}
</style>


