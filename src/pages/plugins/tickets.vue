<template>
  <div v-if="!loading">
    <header class="flex items-start justify-between">
      <h2 class="mt-0 mb-2">Tickets</h2>
      <div class="flex items-center">
        <p>Active</p>
        <Switch
          v-model:checked="pluginConfig.enabled"
          @update:checked="togglePluginStatus"
          id="tickets-toggle"
          name="tickets-toggle"
          class="ml-3"
        />
      </div>
    </header>
    <p>WIP</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPluginConfigs, togglePlugin } from '@/api/plugins'
import Switch from '@/components/ui/switch/Switch.vue'
import { usePlugins } from '@/hooks/usePlugins'

const route = useRoute()
const guildId = ref(route.params.guildID)
const pluginId = ref(route.params.pluginID)
const pluginConfig = ref({
	enabled: false,
})
const loading = ref(true)

const { plugins, fetchPlugins, togglePluginState } = usePlugins()

const initializePluginConfig = async () => {
	loading.value = true
	await fetchPlugins(guildId.value)
	const config = plugins.value.find((config) => config.id === pluginId.value)
	if (config) {
		pluginConfig.value = config
	} else {
		console.error('Plugin configuration not found for:', pluginId.value)
	}
	loading.value = false
}

const togglePluginStatus = async (checked) => {
	try {
		await togglePlugin(guildId.value, pluginId.value, checked)
		pluginConfig.value.enabled = checked
		// Emit event to notify about the status change
		const event = new CustomEvent('plugin-status-changed', {
			detail: {
				pluginId: pluginId.value,
				enabled: checked,
			},
		})
		window.dispatchEvent(event)
	} catch (err) {
		console.error('Failed to toggle plugin status:', err)
	}
}

onMounted(initializePluginConfig)

watch(
	() => route.params.pluginID,
	(newPluginID) => {
		pluginId.value = newPluginID
		initializePluginConfig()
	},
	{ immediate: true },
)
</script>
