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
         d="M12.489 5.06a2 2 0 0 0-.978 0c-.32.08-.642.29-1.71 1.049L6.6 8.38c-.79.56-1.015.731-1.172.93a2 2 0 0 0-.348.674c-.071.244-.08.526-.08 1.494V15.2c0 .857 0 1.439.037 1.89.035.438.1.662.18.818a2 2 0 0 0 .874.874c.157.08.38.145.82.18C7.361 19 7.943 19 8.8 19h6.4c.857 0 1.439 0 1.89-.037.438-.036.662-.101.818-.18a2 2 0 0 0 .874-.875c.08-.156.145-.38.18-.819C19 16.64 19 16.057 19 15.2v-3.72c0-.968-.01-1.25-.081-1.494a2 2 0 0 0-.348-.673c-.157-.2-.382-.371-1.171-.931L14.2 6.11c-1.069-.76-1.392-.968-1.711-1.049Zm-1.467-1.94a4 4 0 0 1 1.956 0c.73.185 1.377.645 2.237 1.256l.143.102 3.2 2.272.104.073c.639.454 1.122.796 1.48 1.25a4 4 0 0 1 .696 1.348c.163.555.163 1.147.162 1.93v3.891c0 .805 0 1.469-.044 2.01-.046.562-.145 1.079-.392 1.564a4 4 0 0 1-1.748 1.748c-.485.247-1.002.346-1.564.392-.541.044-1.206.044-2.01.044H8.758c-.805 0-1.47 0-2.01-.044-.563-.046-1.08-.145-1.565-.392a4 4 0 0 1-1.748-1.748c-.247-.485-.346-1.002-.392-1.564C3 16.711 3 16.046 3 15.242v-3.89c0-.784 0-1.376.163-1.931a4 4 0 0 1 .695-1.347c.359-.455.841-.797 1.48-1.25l.104-.074 3.2-2.272.143-.102c.86-.61 1.507-1.07 2.237-1.255Z"
         fill="currentColor"
      />
   </Primitive>
</template>
