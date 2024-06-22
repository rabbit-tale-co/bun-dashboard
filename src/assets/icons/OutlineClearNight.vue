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
         d="M12.85 2.48a1 1 0 0 1 .035.978A8 8 0 0 0 20 15.12h.004a1 1 0 0 1 .888 1.458A10 10 0 0 1 12 22C6.477 22 2 17.523 2 12c0-5.521 4.475-9.998 9.996-10a1 1 0 0 1 .854.48Zm-2.4 1.67a8 8 0 1 0 7.82 12.82c-4.7-.82-8.27-4.916-8.27-9.85 0-1.033.157-2.03.449-2.97Z"
         fill="currentColor"
      />
   </Primitive>
</template>
