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
         d="M7 8a2 2 0 0 1 2-2 1 1 0 0 0 0-2 4 4 0 1 0 0 8 1 1 0 1 0 0-2 2 2 0 0 1-2-2Zm-3 9.667C4 16.747 4.746 16 5.667 16H6a1 1 0 1 0 0-2h-.333A3.667 3.667 0 0 0 2 17.667 2.333 2.333 0 0 0 4.333 20H6a1 1 0 1 0 0-2H4.333A.333.333 0 0 1 4 17.667Z"
         fill="currentColor"
      />
      <path
         fill-rule="evenodd"
         clip-rule="evenodd"
         d="M15 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm-1.333 6A3.667 3.667 0 0 0 8 17.667 2.333 2.333 0 0 0 10.333 20h9.334A2.333 2.333 0 0 0 22 17.667 3.667 3.667 0 0 0 18.333 14h-6.666ZM10 17.667c0-.92.746-1.667 1.667-1.667h6.666c.92 0 1.667.746 1.667 1.667 0 .184-.15.333-.333.333h-9.334a.333.333 0 0 1-.333-.333Z"
         fill="currentColor"
      />
   </Primitive>
</template>
