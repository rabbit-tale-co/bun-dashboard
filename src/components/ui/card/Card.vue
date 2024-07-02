<script setup>
import { cn } from '@/lib/utils'

const props = defineProps({
	class: { type: null, required: false },
})
</script>

<template>
  <div
    :class="
      cn(
        'rounded-lg dark:bg-card transition-colors bg-card/20 text-foreground shadow-sm',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
