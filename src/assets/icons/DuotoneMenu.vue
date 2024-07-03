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
         d="M3 11a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2H3Z"
         fill="currentColor"
      />
      <path
         fill-rule="evenodd"
         clip-rule="evenodd"
         class="opacity-50"
         d="M2 5a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm0 14a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Z"
         fill="currentColor"
      />
   </Primitive>
</template>
