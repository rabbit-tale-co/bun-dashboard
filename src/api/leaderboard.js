import { ref } from 'vue'
import { setCache, getCache, clearExpiredCache } from '../utils/indexedDB'

const isPending = ref(false)
const error = ref(null)

const fetchWithRetry = async (
	url,
	options = {},
	retries = 3,
	backoff = 3000,
) => {
	try {
		const response = await fetch(url, options)
		if (!response.ok) {
			if (response.status === 429 && retries > 0) {
				// Quota exceeded, wait and retry
				await new Promise((res) => setTimeout(res, backoff))
				return fetchWithRetry(url, options, retries - 1, backoff * 2)
			}
			throw new Error('Network response was not ok')
		}
		return await response.json()
	} catch (error) {
		if (retries > 0) {
			await new Promise((res) => setTimeout(res, backoff))
			return fetchWithRetry(url, options, retries - 1, backoff * 2)
		}
		throw error
	}
}

const fetchGlobalLeaderboardData = async (page = 1, limit = 25) => {
	isPending.value = true
	error.value = null
	const cacheKey = `global_leaderboard_${page}_${limit}`
	const cachedLeaderboard = await getCache(cacheKey)

	if (cachedLeaderboard) {
		isPending.value = false
		return cachedLeaderboard
	}

	try {
		const response = await fetch(
			`https://api.rabbittale.co/api/leaderboard/getGlobal?page=${page}&limit=${limit}`,
		)
		if (!response.ok) {
			throw new Error('Failed to fetch global leaderboard')
		}
		const leaderboardData = await response.json()
		await setCache(cacheKey, leaderboardData, 3600) // Cache for 1 hour
		return leaderboardData
	} catch (err) {
		error.value = err.message
		throw err
	} finally {
		isPending.value = false
	}
}

export const useLeaderboard = () => {
	return {
		fetchGlobalLeaderboardData,
		isPending,
		error,
	}
}
