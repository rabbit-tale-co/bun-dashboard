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
         d="M20 8a1 1 0 1 1 0 2h-1V8h1Zm-4 11h-2v1a1 1 0 1 0 2 0v-1ZM14 4a1 1 0 1 1 2 0v1h-2V4Zm-4 15H8v1a1 1 0 1 0 2 0v-1ZM9 3a1 1 0 0 0-1 1v1h2V4a1 1 0 0 0-1-1Zm-4 7V8H4a1 1 0 1 0 0 2h1Zm15 4a1 1 0 1 1 0 2h-1v-2h1ZM4 16h1v-2H4a1 1 0 1 0 0 2Z"
         fill="currentColor"
      />
      <path
         fill-rule="evenodd"
         clip-rule="evenodd"
         class="opacity-50"
         d="M5 8.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C6.52 5 7.08 5 8.2 5h7.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C19 6.52 19 7.08 19 8.2v7.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C17.48 19 16.92 19 15.8 19H8.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C5 17.48 5 16.92 5 15.8V8.2Z"
         fill="currentColor"
      />
      <path
         fill-rule="evenodd"
         clip-rule="evenodd"
         d="M10 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2Z"
         fill="currentColor"
      />
   </Primitive>
</template>
