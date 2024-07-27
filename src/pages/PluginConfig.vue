<template>
  <section v-if="pluginComponent" class="prose max-w-full dark:prose-invert prose-p:my-2 prose-headings:font-semibold prose-img:rounded-3xl space-y-6">
    <component :is="pluginComponent" />
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGuildData } from '@/hooks/useGuildData'
import useAuth from '@/utils/auth'
import { usePlugins } from '@/hooks/usePlugins'
import { markRaw, shallowRef } from 'vue'

const route = useRoute()
const guildId = ref(route.params.guildID)
const pluginId = ref(route.params.pluginID)

const { isAuthenticated, checkSession } = useAuth()
const { guild, roles, channels, loading, error } = useGuildData()
const { plugins, fetchPlugins, togglePluginState } = usePlugins()

const pluginComponent = shallowRef(null)

const pluginComponents = {
	tickets: markRaw(() => import('@/pages/plugins/tickets.vue')),
	welcome: markRaw(() => import('@/pages/plugins/welcome.vue')),
	// Add other plugins here
}

const loadPluginComponent = async () => {
	const pluginLoader = pluginComponents[pluginId.value]
	if (pluginLoader) {
		pluginComponent.value = (await pluginLoader()).default
	}
}

const togglePluginStatus = async () => {
	const plugin = plugins.value.find((p) => p.id === pluginId.value)
	if (plugin) {
		await togglePluginState(guildId.value, pluginId.value, !plugin.enabled)
	}
}

watch(
	() => route.params.pluginID,
	(newPluginID) => {
		pluginId.value = newPluginID
		loadPluginComponent()
	},
	{ immediate: true },
)

onMounted(() => {
	checkSession()
	loadPluginComponent()
})
</script>
