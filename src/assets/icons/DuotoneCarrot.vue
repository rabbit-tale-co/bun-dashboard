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
         d="M13.5 6C7.733 6 3.795 16.182 3.498 20.524a.444.444 0 0 0 .478.478C8.32 20.705 18.5 16.767 18.5 11c0-3-2-5-5-5Z"
         fill="currentColor"
      />
      <path
         fill-rule="evenodd"
         clip-rule="evenodd"
         d="M15.844 15.963a1 1 0 0 0-.137-.17l-1.5-1.5a1 1 0 1 0-1.414 1.414l1.477 1.477a15.1 15.1 0 0 0 1.574-1.22Zm-10.316-2.52 1.265 1.264a1 1 0 0 0 1.414-1.414l-1.5-1.5a1 1 0 0 0-.247-.181 23.99 23.99 0 0 0-.932 1.83Zm3.619-5.42c.04.065.089.127.146.184l1.5 1.5a1 1 0 1 0 1.414-1.414L10.72 6.807a8.596 8.596 0 0 0-1.574 1.216ZM16.5 9a1 1 0 0 1-1-1V4a1 1 0 1 1 2 0v1.586l2.293-2.293a1 1 0 1 1 1.414 1.414L18.914 7H20.5a1 1 0 1 1 0 2h-4Z"
         fill="currentColor"
      />
   </Primitive>
</template>
