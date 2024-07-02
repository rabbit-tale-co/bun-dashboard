<template>
   <section class="bg-background">
      <div class="mx-auto w-full max-w-screen-xl p-6 lg:py-10">
         <div class="flex-col lg:flex-row flex items-center gap-8">
            <h4 class="text-white font-bold text-3xl">{{ serverCount }} Discord servers use Tiny Rabbit</h4>
            <div class="flex items-center flex-wrap justify-center lg:justify-end gap-8 lg:flex-1">
              <img v-for="(server, index) in servers" :key="index" :src="server.imageSrc" class="size-16 rounded-lg" :alt="server.serverName">
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  servers: {
    type: Array,
    required: true
  },
  serverCount: {
    type: Number,
    required: true
  }
})
</script>
