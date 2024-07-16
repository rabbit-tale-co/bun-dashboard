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
         d="M18.555 5.168a1 1 0 0 1 .277 1.387l-8 12a1 1 0 0 1-1.54.152l-3-3a1 1 0 1 1 1.415-1.414l2.138 2.137 7.323-10.985a1 1 0 0 1 1.387-.277Z"
         fill="currentColor"
      />
   </Primitive>
</template>
