<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <tfoot
    :class="
      cn(props.class)
    "
  >
    <slot />
  </tfoot>
</template>
