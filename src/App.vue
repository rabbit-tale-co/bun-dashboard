<template>
   <Toaster
      richColors
      :theme="theme"
   />
   <!-- <Toaster /> -->
   <component :is="layoutComponent" />
   <!-- <Layout /> -->
</template>

<script setup>
import Layout from '@/layouts/default.vue'
import LayoutDashboard from '@/layouts/dashboard.vue'

//  import Dashoboard from '@/components/manage/Dashboard.vue'

import { Toaster } from '@/components/ui/sonner'
import { useColorMode } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const layoutComponent = computed(() => {
	if (route.path.startsWith('/manage')) {
		return LayoutDashboard
	}
	return Layout
})

const colorMode = useColorMode()
const isDark = ref(colorMode.value === 'dark')

watch(colorMode, (newMode) => {
	isDark.value = newMode === 'dark'
})

const theme = computed(() => {
	const mode = colorMode.value
	return mode
})
</script>
