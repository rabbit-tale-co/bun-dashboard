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
         d="M17.414 9.414a2 2 0 1 0-2.828-2.828L12 9.172 9.414 6.586a2 2 0 1 0-2.828 2.828L9.172 12l-2.586 2.586a2 2 0 1 0 2.828 2.828L12 14.828l2.586 2.586a2 2 0 1 0 2.828-2.828L14.828 12l2.586-2.586Z"
         fill="currentColor"
      />
   </Primitive>
</template>
