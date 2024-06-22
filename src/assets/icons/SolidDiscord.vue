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
         d="m9.377 4.309.325.36a1 1 0 0 0 .743.331h3.11a1 1 0 0 0 .743-.33l.324-.36c.235-.261.588-.379.921-.27 1.463.476 5.425 2.277 6.237 7.96.208 1.454.227 4.115.224 5.345a.988.988 0 0 1-.61.908L17.41 19.92a1 1 0 0 1-1.303-.524l-.274-.629a1 1 0 0 1 .363-1.23l.7-.468a.232.232 0 0 0 .104-.193c0-.173-.183-.29-.344-.226-.693.28-2.39.85-4.656.85-2.332 0-3.978-.562-4.656-.843-.158-.066-.344.05-.344.221 0 .076.038.148.101.19l.703.468a1 1 0 0 1 .362 1.231l-.273.629a1 1 0 0 1-1.303.524l-3.979-1.664A.99.99 0 0 1 2 17.34c.004-1.3.032-4.162.2-5.34.812-5.685 4.79-7.485 6.257-7.961.333-.108.686.01.92.27ZM10 12.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm5.5 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
         fill="currentColor"
      />
   </Primitive>
</template>
