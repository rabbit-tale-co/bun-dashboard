export const fetchAvailablePlugins = async () => {
   const response = await fetch('https://api.rabbittale.co/api/plugins/available')
   if (!response.ok) {
      throw new Error('Failed to fetch available plugins')
   }
   return response.json()
}

export const fetchPluginConfigs = async (guildId) => {
   const response = await fetch(`https://api.rabbittale.co/api/plugins/configs?guildId=${guildId}`)
   if (!response.ok) {
      throw new Error('Failed to fetch plugin configurations')
   }
   return response.json()
}


export const togglePlugin = async (guildId, pluginId, enabled) => {
   await fetch('https://api.rabbittale.co/api/plugin/toggle', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ serverId: guildId, pluginId, enabled })
   })
}
