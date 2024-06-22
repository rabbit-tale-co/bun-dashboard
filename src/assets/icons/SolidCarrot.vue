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
         d="M8.906 9.82a.48.48 0 0 0-.692.004c-.745.799-1.445 1.805-2.066 2.902a.493.493 0 0 0 .083.59l.976.977a1 1 0 1 1-1.414 1.414l-.23-.23a.489.489 0 0 0-.802.16c-.707 1.778-1.167 3.543-1.262 4.886a.444.444 0 0 0 .478.478c2.23-.158 5.62-1.32 8.31-2.95a.487.487 0 0 0 .087-.763l-.58-.58a1 1 0 0 1 1.413-1.415l.888.888a.483.483 0 0 0 .676.015c1.058-1.012 1.73-2.105 1.73-3.196-.001-3.5-1.5-5-5-5-.202 0-.403.023-.604.067-.342.074-.421.495-.174.742l1.484 1.484a1 1 0 0 1-1.414 1.414L8.906 9.82ZM17.5 8a1 1 0 0 1-1-1V4a1 1 0 1 1 2 0v.586l1.293-1.293a1 1 0 1 1 1.414 1.414L19.914 6h.586a1 1 0 1 1 0 2h-3Z"
         fill="currentColor"
      />
   </Primitive>
</template>
