import { ref } from 'vue'

// Reactive variables for loading state and error handling
const loading = ref(false)
const error = ref(null)

/**
 * Fetches details of a specific guild.
 * @param {string} guildId - The ID of the guild.
 * @returns {Promise} - A promise that resolves to the guild details.
 */
const fetchGuildDetails = async (guildId) => {
	loading.value = true
	error.value = null
	try {
		const response = await fetch(
			`https://api.rabbittale.co/api/guilds/getGuild?guildId=${guildId}`,
		)
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}
		const data = await response.json()
		return data
	} catch (err) {
		if (err instanceof Error) {
			error.value = err.message
		} else {
			error.value = 'An unexpected error occurred.'
		}
		throw err
	} finally {
		loading.value = false
	}
}

export { fetchGuildDetails, loading, error }
