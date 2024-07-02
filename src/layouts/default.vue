<script setup>
// import Sidebar from './Sidebar.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
      <!-- <Sidebar /> -->
      <Header class="py-5" />
      <section class="flex-grow flex flex-col bg-backgroundSecondary">
            <router-view />
      </section>
      <Footer class="flex-shrink-0 py-10" />
</template>
