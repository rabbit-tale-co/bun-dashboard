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
         d="M3 6.5a3.5 3.5 0 1 1 7 0V8h4V6.5a3.5 3.5 0 1 1 3.5 3.5H16v4h1.5a3.5 3.5 0 1 1-3.5 3.5V16h-4v1.5A3.5 3.5 0 1 1 6.5 14H8v-4H6.5A3.5 3.5 0 0 1 3 6.5ZM8 8V6.5A1.5 1.5 0 1 0 6.5 8H8Zm2 6h4v-4h-4v4Zm-2 2H6.5A1.5 1.5 0 1 0 8 17.5V16Zm8 0v1.5a1.5 1.5 0 1 0 1.5-1.5H16Zm0-8h1.5A1.5 1.5 0 1 0 16 6.5V8Z"
         fill="currentColor"
      />
   </Primitive>
</template>
