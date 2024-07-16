<template>
   <div class="bg-card-hover rounded-lg px-6 py-5 flex items-center justify-start h-24 overflow-x-hidden">
     <p :class="getRankClass((currentPage - 1) * usersPerPage + index)">
       #{{ (currentPage - 1) * usersPerPage + index + 1 }}
     </p>
     <img :src="user.avatarUrl" class="size-12 rounded-full ml-4" :alt="user.username">
     <div class="ml-4 text-left text-base">
       <div class="flex items-start justify-start text-white">
         <p class="font-bold line-clamp-1">{{ user.globalName }}</p>
       </div>
       <div class="flex items-center justify-start text-muted-foreground">
         <p class="text-base">{{ commaFormatter.format(user.xp) }} XP</p>
       </div>
     </div>
     <SolidCrown v-if="((currentPage - 1) * usersPerPage + index) === 0" class="ml-auto text-premium" />
   </div>
 </template>
 
 <script setup>
import { computed } from 'vue'
import { SolidCrown } from '@/components/ui/icons'
import { commaFormatter } from '@/utils/formatter'

const props = defineProps({
	user: Object,
	index: Number,
	currentPage: Number,
	usersPerPage: Number,
})

const getRankClass = (rank) => {
	if (rank === 0) return 'text-premium'
	if (rank === 1) return 'text-[#c0c0c0]'
	if (rank === 2) return 'text-[#cd7f32]'
	return 'text-white/30'
}
</script>
 