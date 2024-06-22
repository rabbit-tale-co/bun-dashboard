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
         d="M8.01 5.2c-.01.27-.015.405.038.516a.51.51 0 0 0 .22.227C8.377 6 8.518 6 8.8 6h4.063c.504 0 .996 0 1.412.034.458.037.997.125 1.54.402a4 4 0 0 1 1.748 1.748c.277.543.365 1.082.402 1.54.034.416.034.907.034 1.412V15.2c0 .283 0 .424.057.533a.511.511 0 0 0 .227.22c.11.053.246.048.517.038.5-.018.831-.067 1.107-.208a2 2 0 0 0 .874-.874C21 14.48 21 13.92 21 12.8V6.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C19.48 3 18.92 3 17.8 3h-6.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874c-.14.276-.19.607-.208 1.107Z"
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
