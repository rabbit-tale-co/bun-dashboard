import { ref } from 'vue'
import { fetchAvailablePlugins, fetchPluginConfigs } from '@/api/plugins'

const usePlugins = () => {
   const plugins = ref([])
   const loading = ref(false)
   const error = ref(null)

   const fetchPlugins = async (guildId) => {
      loading.value = true
      error.value = null
      try {
         const availablePlugins = await fetchAvailablePlugins()
         const pluginsConfig = await fetchPluginConfigs(guildId)
         // Merge available plugins and configurations
         plugins.value = availablePlugins.map(plugin => {
            const config = pluginsConfig.find(cfg => cfg.id === plugin.id) || {}
            return { ...plugin, ...config }
         })
      } catch (err) {
         error.value = 'Failed to fetch plugins'
      } finally {
         loading.value = false
      }
   }

   const togglePluginState = async (guildId, pluginId, enabled) => {
      try {
         await togglePlugin(guildId, pluginId, enabled)
         const plugin = plugins.value.find((p) => p.id === pluginId)
         if (plugin) {
            plugin.enabled = enabled
         }
      } catch (err) {
         console.error('Failed to toggle plugin:', err)
      }
   }

   return {
      plugins,
      loading,
      error,
      fetchPlugins,
      togglePluginState,
   }
}

export { usePlugins }
