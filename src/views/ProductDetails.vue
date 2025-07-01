<template>
  <section class="product-detail-section">
    <v-container>
      <v-row
        class="flex-column-reverse flex-lg-row align-center"
      >
        <v-col cols="12" lg="6" class="text-center text-lg-left">
          <h1 class="text-h5 font-weight-medium mb-3">
            {{ product.title }}
          </h1>
          <div class="text-red text-h6 font-weight-bold mb-4">
            ${{ product.price }}
          </div>
          <p class="mb-6">
            {{ product.description }}
          </p>
          <v-btn
            color="primary"
            size="large"
            class="text-white px-6 py-4"
            @click="cart.addToCart(product)"
          >
            Add to Cart
          </v-btn>
        </v-col>

        <v-col cols="12" lg="6" class="d-flex justify-center mb-6 mb-lg-0">
          <v-img
            :src="product.image"
            max-width="250"
            aspect-ratio="1"
            contain
            class="rounded"
          />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useProductsStore } from '../store/products'
import { useCartStore } from '../store/cart'

const route = useRoute()
const productsStore = useProductsStore()
const cart = useCartStore()

const product = computed(() =>
  productsStore.products.find(p => p.id === parseInt(route.params.id)) || {}
)
</script>

<style scoped>
.product-detail-section {
  padding-top: 120px;
  padding-bottom: 100px;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>
