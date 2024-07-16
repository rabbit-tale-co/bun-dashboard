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
         d="M17.11 5.336a2 2 0 0 1 .554 2.774l-6 9a2 2 0 0 1-3.078.304l-3-3a2 2 0 1 1 2.828-2.828l1.275 1.275 4.647-6.97a2 2 0 0 1 2.773-.555Z"
         fill="currentColor"
      />
   </Primitive>
</template>
