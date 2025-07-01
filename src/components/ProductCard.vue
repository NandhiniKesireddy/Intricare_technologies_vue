<template>
  <v-col cols="12" sm="6" md="4" lg="2" class="d-flex">
    <v-card class="product-card d-flex flex-column" height="100%">
      <div class="image-wrapper">
        <v-img
          :src="product.image"
          class="hover-image"
          height="180"
          width="100%"
        />
        <div class="action-buttons">
          <v-btn icon class="cart-button" @click="cart.addToCart(product)">
            <v-icon size="26" color="white">mdi-plus</v-icon>
          </v-btn>
          <router-link :to="`/product/${product.id}`">
            <v-btn icon class="view-button">
              <v-icon size="24" color="primary">mdi-eye</v-icon>
            </v-btn>
          </router-link>
        </div>
      </div>
       <v-card-text>
      <div class="text-caption text-grey mb-1 text-capitalize">
        {{ product.category }}
      </div>
      <router-link :to="`/product/${product.id}`" class="text-decoration-none">
        <div class="font-weight-medium mb-1 text-body-2">
          {{ product.title }}
        </div>
      </router-link>
      <div class="text-subtitle-1 font-weight-bold text-primary">
        ${{ product.price }}
      </div>
    </v-card-text>

      <v-card-actions class="mt-auto">
        <v-btn color="primary" @click="$emit('edit', product)">Edit</v-btn>
        <v-btn color="error" @click="$emit('delete', product.id)">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue'
import { useCartStore } from '../store/cart'

defineProps(['product'])
defineEmits(['edit', 'delete'])

const cart = useCartStore()

</script>

<style scoped>
.product-card {
  width: 100%;
  height: 100%;
  max-height: 400px;
  transition: 0.3s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.image-wrapper {
  position: relative;
  background-color: #f5f5f5;
  height: 200px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.hover-image {
  object-fit: contain;
  border-radius: 4px 4px 0 0;
}

.image-wrapper:hover .hover-image {
  transform: scale(1.05);
}

.action-buttons {
  position: absolute;
  top: 10px;
  right: -60px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  transition: all 0.3s ease;
}

.image-wrapper:hover .action-buttons {
  right: 10px;
  opacity: 1;
}

.cart-button {
  background-color: #14b8a6;
  width: 44px;
  height: 44px;
  border-radius: 50%;
}

.view-button {
  background-color: #ffffff;
  width: 44px;
  height: 44px;
  border-radius: 50%;
}
</style>

