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
         d="M17 17H7v2h10v-2ZM5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4H5Z"
         fill="currentColor"
      />
      <path
         fill-rule="evenodd"
         clip-rule="evenodd"
         d="M12 3a1 1 0 0 1 .857.486l2.412 4.018 4.106-3.285a1 1 0 0 1 1.609.96L18.834 17H5.166L3.016 5.179a1 1 0 0 1 1.609-.96L8.73 7.504l2.412-4.018A1 1 0 0 1 12 3Zm0 2.944-2.731 4.552L5.462 7.45 6.835 15h10.33l1.373-7.55-3.807 3.046L12 5.944Z"
         fill="currentColor"
      />
   </Primitive>
</template>
