<script setup>
// import Sidebar from './Sidebar.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
   <div class="flex flex-col min-h-screen py-10 max-lg:p-4 space-y-10">
      <!-- <Sidebar /> -->
      <Header />
      <section class="flex-grow flex flex-col">
         <main class="flex-grow max-w-screen-lg w-full mx-auto pb-4">
            <router-view />
         </main>
      </section>
      <Footer class="flex-shrink-0" />
   </div>
</template>
