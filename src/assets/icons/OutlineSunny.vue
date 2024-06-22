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
         d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
         fill="currentColor"
      />
      <path
         fill-rule="evenodd"
         clip-rule="evenodd"
         d="M11 3a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0V3ZM5.636 7.05A1 1 0 0 0 7.05 5.638l-.707-.707A1 1 0 1 0 4.93 6.344l.707.707Zm13.435-2.12a1 1 0 0 0-1.414 0l-.707.707a1 1 0 0 0 1.414 1.414l.707-.707a1 1 0 0 0 0-1.414ZM7.05 16.95a1 1 0 0 0-1.414 0l-.707.706a1 1 0 1 0 1.414 1.415l.707-.708a1 1 0 0 0 0-1.414Zm12.021 2.12a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414ZM12 19a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0v-1a1 1 0 0 0-1-1Zm9-8a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM5 12a1 1 0 0 0-1-1H3a1 1 0 1 0 0 2h1a1 1 0 0 0 1-1Z"
         fill="currentColor"
      />
   </Primitive>
</template>
