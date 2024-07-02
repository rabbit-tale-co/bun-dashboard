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
         d="M9.65 4.052c.34.056.456.459.272.75A5.972 5.972 0 0 0 9 8a5.97 5.97 0 0 0 .922 3.197c.184.292.068.695-.273.75a4 4 0 1 1 0-7.895ZM6.41 14c.431 0 .677.528.453.898A5.972 5.972 0 0 0 6 18c0 .421.065.827.186 1.209.116.367-.133.791-.518.791H4a2 2 0 0 1-2-2 4 4 0 0 1 4-4h.41ZM15 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-6a4 4 0 0 0-4 4Z"
         fill="currentColor"
      />
   </Primitive>
</template>
