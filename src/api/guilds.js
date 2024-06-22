import { setCache, getCache } from '@/utils/cache'
import { ref } from 'vue'

// Reactive variables for loading state and error handling
const isPending = ref(false)
const error = ref(null)

/**
 * Fetches guild data for the authenticated user.
 * @param {string} accessToken - The access token for the Discord API.
 * @returns {Promise} - A promise that resolves to a list of guilds.
 */
const fetchGuildsData = async (accessToken) => {
	isPending.value = true
	error.value = null

	// Attempt to retrieve cached guild data
	const cachedGuilds = getCache('guilds_data')
	if (cachedGuilds) {
		isPending.value = false
		return cachedGuilds
	}

	try {
		// Fetch guild data from Discord API
		const response = await fetch('https://discord.com/api/users/@me/guilds', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		// Check if the response is successful
		if (!response.ok) {
			throw new Error('Failed to fetch guilds')
		}

		const guildData = await response.json()

		// Fetch additional guild details and permissions
		const guildList = await Promise.all(
			guildData.map(async (guild) => {
				const isAdmin = (guild.permissions & 0x8) === 0x8
				const guildDetails = await fetch(
					`https://api.rabbittale.co/api/guilds/checkBotMembership?guildId=${guild.id}`,
				)
				const data = await guildDetails.json()

				return {
					id: guild.id,
					name: guild.name,
					iconUrl: guild.icon
						? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=4096`
						: null,
					isAdmin,
					isBotMember: data.isBotMember,
				}
			}),
		)

		// Cache the fetched guild data
		setCache('guilds_data', guildList, 3600) // Cache for 1 hour
		return guildList
	} catch (err) {
		error.value = err.message
		throw err
	} finally {
		isPending.value = false
	}
}

export { fetchGuildsData, isPending, error }
