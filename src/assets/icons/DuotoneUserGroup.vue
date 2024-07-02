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
         d="M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2 4 4 0 0 0-4-4H6a4 4 0 0 0-4 4Z"
         fill="currentColor"
      />
      <path
         fill-rule="evenodd"
         clip-rule="evenodd"
         d="M15 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-6a4 4 0 0 0-4 4Z"
         fill="currentColor"
      />
   </Primitive>
</template>
