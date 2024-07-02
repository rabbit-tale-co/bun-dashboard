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
         d="M5 16h14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-4Z"
         fill="currentColor"
      />
      <path
         fill-rule="evenodd"
         clip-rule="evenodd"
         d="M3.008 5.137a.5.5 0 0 1 .763-.51l4.775 3.08a.5.5 0 0 0 .711-.182l2.303-4.261a.5.5 0 0 1 .88 0l2.303 4.26a.5.5 0 0 0 .711.183l4.775-3.08a.5.5 0 0 1 .763.51L19 16H5L3.008 5.137Z"
         fill="currentColor"
      />
   </Primitive>
</template>
