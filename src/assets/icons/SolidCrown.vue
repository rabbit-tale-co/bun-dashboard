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
         d="M5 18a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2ZM3.014 5.159a.5.5 0 0 1 .76-.52l4.772 3.07a.5.5 0 0 0 .71-.184l2.304-4.261a.5.5 0 0 1 .88 0l2.304 4.262a.5.5 0 0 0 .71.183l4.78-3.07a.5.5 0 0 1 .761.52l-1.832 9.04a1 1 0 0 1-.98.801H5.818a1 1 0 0 1-.98-.802L3.014 5.159Z"
         fill="currentColor"
      />
   </Primitive>
</template>
