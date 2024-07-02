import { ref } from 'vue'
import { setCache, getCache } from '../utils/cache'

const isPending = ref(false)
const error = ref(null)

const fetchGlobalLeaderboardData = async (page = 1, limit = 25) => {
	isPending.value = true
	error.value = null
	// const cacheKey = `global_leaderboard_${page}_${limit}`
	// const cachedLeaderboard = getCache(cacheKey)
	// if (cachedLeaderboard) {
	// 	isPending.value = false
	// 	return cachedLeaderboard
	// }

	try {
		const response = await fetch(
			`https://api.rabbittale.co/api/leaderboard/getGlobal?page=${page}&limit=${limit}`
		)
		if (!response.ok) {
			throw new Error('Failed to fetch global leaderboard')
		}
		const leaderboardData = await response.json()
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
