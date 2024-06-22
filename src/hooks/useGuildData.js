import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
	fetchGuildDetails as fetchGuildDetailsAPI,
	loading,
	error,
} from '@/api/guildData'
import { setCache, getCache } from '@/utils/cache'

const guild = ref(null)
const roles = ref([])
const channels = ref([])

const fetchGuildDetails = async (guildId) => {
	const cachedGuild = getCache(`guild_${guildId}`)
	if (cachedGuild) {
		guild.value = cachedGuild
		roles.value = cachedGuild.roles || []
		channels.value = cachedGuild.channels || [] // Add this line
		console.log('Loaded guild data from cache:', cachedGuild)
		return
	}

	try {
		const data = await fetchGuildDetailsAPI(guildId)
		guild.value = {
			...data.guildDetails,
			categoryCount: data.categoryCount,
			textChannelCount: data.textChannelCount,
			voiceChannelCount: data.voiceChannelCount,
			memberCount: data.memberCount,
			roles: data.roles,
			channels: data.channels,
		}
		roles.value = data.roles
		channels.value = data.channels // Add this line
		setCache(`guild_${guildId}`, guild.value, 3600) // Cache for 1 hour
		console.log('Fetched guild data from API:', guild.value)
	} catch (err) {
		console.error('Error fetching guild details:', err)
	}
}

const useGuildData = () => {
	const route = useRoute()
	const guildId = ref(route.params.guildID)

	watch(
		() => route.params.guildID,
		async (newGuildID) => {
			if (newGuildID) {
				guildId.value = newGuildID
				await fetchGuildDetails(guildId.value)
			}
		},
		{ immediate: true },
	)

	return {
		guild,
		roles,
		channels,
		loading,
		error,
	}
}

export { useGuildData }
