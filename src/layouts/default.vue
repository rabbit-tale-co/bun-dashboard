<script setup>
// import Sidebar from './Sidebar.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
      <!-- <Sidebar /> -->
      <Header class="py-5" />
      <router-view />
      <Footer class="mt-auto py-10" />
</template>
