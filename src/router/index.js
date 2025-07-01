import { createRouter, createWebHistory } from 'vue-router'
import ProductDashboard from '@/views/ProductDashboard.vue'
import ProductDetails from '../views/ProductDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProductDashboard
  },
  { 
    path: '/product/:id', 
    component: ProductDetails, 
    props: true 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
