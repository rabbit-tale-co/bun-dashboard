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
         d="M8.586 5.586a2 2 0 0 0 0 2.828L12.172 12l-3.586 3.586a2 2 0 1 0 2.828 2.828l5-5a2 2 0 0 0 0-2.828l-5-5a2 2 0 0 0-2.828 0Z"
         fill="currentColor"
      />
   </Primitive>
</template>
