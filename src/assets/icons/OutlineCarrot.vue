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
         d="M10.293 7.793a1 1 0 0 1 1.414 0l1.5 1.5a1 1 0 0 1-1.414 1.414l-1.5-1.5a1 1 0 0 1 0-1.414Zm-4 5a1 1 0 0 1 1.414 0l1.5 1.5a1 1 0 1 1-1.414 1.414l-1.5-1.5a1 1 0 0 1 0-1.414Zm6.914.5a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.414-1.414l-1.5-1.5ZM16.5 9a1 1 0 0 1-1-1V4a1 1 0 1 1 2 0v1.586l2.293-2.293a1 1 0 1 1 1.414 1.414L18.914 7H20.5a1 1 0 1 1 0 2h-4Z"
         fill="currentColor"
      />
      <path
         fill-rule="evenodd"
         clip-rule="evenodd"
         d="M5.82 18.68a24.186 24.186 0 0 0 6.064-2.37c1.421-.801 2.62-1.71 3.443-2.662C16.144 12.7 16.5 11.82 16.5 11c0-1.045-.34-1.761-.79-2.21-.449-.45-1.164-.79-2.21-.79-.82 0-1.701.357-2.647 1.173-.953.822-1.861 2.022-2.663 3.444a24.185 24.185 0 0 0-2.37 6.064Zm-2.322 1.844C3.795 16.182 7.733 6 13.5 6c3 0 5 2 5 5 0 5.767-10.181 9.706-14.524 10.002a.444.444 0 0 1-.478-.478Z"
         fill="currentColor"
      />
   </Primitive>
</template>
