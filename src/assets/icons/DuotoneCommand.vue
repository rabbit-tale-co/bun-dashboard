<script setup>
import { Primitive } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps({
	size: { type: null, required: false, default: 24 },
	as: { type: null, required: false, default: 'svg' },
})
</script>

<template>
   <Primitive
      :as="as"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :class="cn(props.class)"
   >
      <path
         fill-rule="evenodd"
         clip-rule="evenodd"
         class="opacity-50"
         d="M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6V9.4Z"
         fill="currentColor"
      />
      <path
         fill-rule="evenodd"
         clip-rule="evenodd"
         d="M5 8a3 3 0 0 1 6 0v1h2V8a3 3 0 1 1 3 3h-1v2h1a3 3 0 1 1-3 3v-1h-2v1a3 3 0 1 1-3-3h1v-2H8a3 3 0 0 1-3-3Zm4 1V8a1 1 0 1 0-1 1h1Zm2 4h2v-2h-2v2Zm-2 2H8a1 1 0 1 0 1 1v-1Zm6 0v1a1 1 0 1 0 1-1h-1Zm0-6h1a1 1 0 1 0-1-1v1Z"
         fill="currentColor"
      />
   </Primitive>
</template>
