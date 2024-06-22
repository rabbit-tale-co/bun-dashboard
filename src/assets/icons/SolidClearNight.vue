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
         d="M12.885 3.458A1 1 0 0 0 11.995 2C6.476 2.002 2 6.479 2 12c0 5.523 4.477 10 10 10a10 10 0 0 0 8.892-5.422 1 1 0 0 0-.888-1.458H20a8 8 0 0 1-7.115-11.662Z"
         fill="currentColor"
      />
   </Primitive>
</template>
