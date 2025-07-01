<template>
  <v-navigation-drawer
    v-model="sidebar.isOpen"
    location="right"
    temporary
    width="470"
    elevation="10"
  >
    <div class="d-flex justify-end pa-2">
      <v-btn icon @click="sidebar.close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <v-list-item class="px-4 pt-0 pb-2">
      <div class="text-subtitle-1 font-weight-medium">
        Shopping Bag ({{ cart.itemAmount }})
      </div>
    </v-list-item>

    <v-divider />

    <div style="max-height: 400px; overflow-y: auto;">
      <CartItem
        v-for="item in cart.cart"
        :key="item.id"
        :item="item"
      />
    </div>

    <v-divider class="my-2" />

    <v-container>
      <v-row class="mb-1">
        <v-col cols="6">Subtotal:</v-col>
        <v-col cols="6" class="text-right font-weight-bold">
          ${{ cart.total.toFixed(2) }}
        </v-col>
      </v-row>
      <v-btn block color="red-darken-1" variant="flat" @click="cart.clearCart">
        CLEAR CART
      </v-btn>
      <v-btn block color="primary" class="mt-2">CHECKOUT</v-btn>
    </v-container>
  </v-navigation-drawer>
</template>

<script setup>
import { useCartStore } from '../store/cart'
import { useSidebarStore } from '../store/sidebar'
import CartItem from './CartItem.vue'

const cart = useCartStore()
const sidebar = useSidebarStore()
</script>
