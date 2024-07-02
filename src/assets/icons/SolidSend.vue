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
         d="M3.022 5.284c-.23-1.598 1.43-2.796 2.874-2.074l14.001 7c1.475.738 1.474 2.842 0 3.579L5.895 20.78c-1.444.721-3.104-.477-2.873-2.075l.699-4.849a1 1 0 0 1 .99-.857H10a1 1 0 1 0 0-2H4.712a1 1 0 0 1-.99-.857l-.7-4.859Z"
         fill="currentColor"
      />
   </Primitive>
</template>
