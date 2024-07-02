<template>
   <section class="mx-auto w-full max-w-screen-xl p-6 lg:py-10">
     <div class="text-center">
       <h2 class="text-4xl font-bold leading-tight">Total XP Across All Servers</h2>
       <p class="text-2xl mt-4">{{ formattedTotalXP }}</p>
     </div>
   </section>
 </template>
 
 <script setup>
 import { ref, onMounted } from 'vue';
 import { useTotalXP } from '@/utils/totalXP';
 
 const totalXP = ref(0);
 const formattedTotalXP = computed(() => formatter.format(totalXP.value));
 
 const { fetchTotalXP } = useTotalXP();
 
 onMounted(async () => {
   totalXP.value = await fetchTotalXP();
 });
 </script>