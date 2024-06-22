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
         d="M8 6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C9.52 3 10.08 3 11.2 3h6.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 4.52 21 5.08 21 6.2v6.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 16 18.92 16 17.8 16h-6.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C8 14.48 8 13.92 8 12.8V6.2Z"
         fill="currentColor"
      />
      <path
         fill-rule="evenodd"
         clip-rule="evenodd"
         d="M3 11.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 8 5.08 8 6.2 8h6.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C16 9.52 16 10.08 16 11.2v6.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C14.48 21 13.92 21 12.8 21H6.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 19.48 3 18.92 3 17.8v-6.6Z"
         fill="currentColor"
      />
   </Primitive>
</template>
