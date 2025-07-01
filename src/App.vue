<template>
  <v-app>
    <AppHeader
      v-model:search="search"
      :category="selectedCategory"
      :categories="categories"
      @update:search="search = $event"
      @update:category="selectedCategory = $event"
      @add-product="openAddForm"
    />
    <SideBar />
    <div :style="backgroundStyle">
      <v-main>
        <router-view
          :search="search"
          :selectedCategory="selectedCategory"
          :categories="categories"
          @update-categories="categories = $event"
        />
      </v-main>
      <AppFooter />
    </div>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import bg from './assets/bg_hero.svg'
import SideBar from '@/components/SideBar.vue'

const search = ref('')
const selectedCategory = ref([])
const categories = ref([])

const openAddForm = () => {
  window.dispatchEvent(new Event('open-add-form'))
}

const backgroundStyle = {
  backgroundImage: `url(${bg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
}
</script>

<style scoped>
body {
  margin: 0;
}
</style>
