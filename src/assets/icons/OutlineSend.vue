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
         d="M7.346 3.327c-2.198-1.097-4.711.768-4.297 3.19l.908 5.315a1 1 0 0 1 0 .336l-.909 5.324c-.413 2.422 2.1 4.287 4.298 3.189l12-5.997c2.212-1.105 2.21-4.262-.002-5.367L7.346 3.327ZM5.02 6.18a1 1 0 0 1 1.433-1.064l11.998 5.99a1 1 0 0 1 0 1.79L6.452 18.891a1 1 0 0 1-1.432-1.063L5.844 13H10a1 1 0 1 0 0-2H5.844L5.02 6.18Z"
         fill="currentColor"
      />
   </Primitive>
</template>
