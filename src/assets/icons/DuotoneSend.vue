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
         d="M5.897 3.21c-1.444-.722-3.104.476-2.874 2.074l.946 6.573a1 1 0 0 1 0 .285l-.946 6.564c-.23 1.598 1.43 2.796 2.873 2.075l14-6.992c1.476-.737 1.476-2.841.002-3.579l-14.001-7Z"
         fill="currentColor"
      />
      <path
         fill-rule="evenodd"
         clip-rule="evenodd"
         d="M3.846 13H10a1 1 0 1 0 0-2H3.846l.123.857a1 1 0 0 1 0 .285L3.846 13Z"
         fill="currentColor"
      />
   </Primitive>
</template>
