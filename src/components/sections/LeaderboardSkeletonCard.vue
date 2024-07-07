<template>
   <div class="bg-card-hover rounded-lg px-6 py-5 flex items-center justify-start h-24 overflow-x-hidden">
     <p>#0</p>
     <Skeleton class="size-12 rounded-full ml-4 bg-white/10" />
     <div class="ml-4 text-left text-base flex flex-1 flex-col">
       <Skeleton class="w-3/4 h-5 mb-2 bg-white/10" />
       <Skeleton class="w-1/2 h-4 bg-white/10" />
     </div>
   </div>
 </template>

 <script setup>
import { Skeleton } from '@/components/ui/skeleton'
</script>
