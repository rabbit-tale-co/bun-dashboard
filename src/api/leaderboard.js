import useSWRV from 'swrv'

/**
 * Fetches the global leaderboard data.
 * @param {number} [page=1] - The page number for pagination.
 * @param {number} [limit=25] - The number of items per page.
 * @returns {Promise<object>} The global leaderboard data.
 * @throws Will throw an error if the fetch operation fails.
 */
const fetchGlobalLeaderboardData = async (page = 1, limit = 25) => {
	const cacheKey = `global_leaderboard_${page}_${limit}`
	const cachedData = localStorage.getItem(cacheKey)

	if (cachedData) {
		const { data, expiresAt } = JSON.parse(cachedData)
		if (expiresAt > Date.now()) {
			//console.log('Using cached leaderboard data')
			return data
		}
		//console.log('Cache expired, fetching new leaderboard data')
	}

	try {
		//console.log(`Fetching leaderboard data for page ${page} and limit ${limit}`);
		const response = await fetch(
			`https://api.rabbittale.co/api/leaderboard/getGlobal?page=${page}&limit=${limit}`,
		)
		if (!response.ok) {
			const errorText = await response.text()
			console.error('Failed to fetch leaderboard:', errorText)
			throw new Error('Failed to fetch global leaderboard')
		}
		const leaderboardData = await response.json()
		localStorage.setItem(
			cacheKey,
			JSON.stringify({
				data: leaderboardData,
				expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes in milliseconds
			}),
		)
		return leaderboardData
	} catch (err) {
		console.error('Error fetching global leaderboard data:', err)
		throw err
	}
}

/**
 * Composable for fetching leaderboard data.
 * @param {number} [page=1] - The page number for pagination.
 * @param {number} [limit=25] - The number of items per page.
 * @returns {object} An object containing the leaderboard data and swrv states.
 */
export const useLeaderboard = (page = 1, limit = 25) => {
	const key = `global_leaderboard_${page}_${limit}`
	const { data, error, isValidating } = useSWRV(
		key,
		() => fetchGlobalLeaderboardData(page, limit),
		{
			revalidateOnFocus: false,
			refreshInterval: 15 * 60 * 1000, // 15 minutes
			dedupingInterval: 15 * 60 * 1000, // 15 minutes
			errorRetryInterval: 5000,
			errorRetryCount: 3,
			shouldRetryOnError: true,
		},
	)

	return {
		leaderboard: data || {},
		error,
		isValidating,
	}
}

// import { ref } from 'vue'
// import { setCache, getCache, clearExpiredCache } from '@/storage/indexedDB'

// const isPending = ref(false)
// const error = ref(null)

// const fetchWithRetry = async (
// 	url,
// 	options = {},
// 	retries = 3,
// 	backoff = 3000,
// ) => {
// 	try {
// 		const response = await fetch(url, options)
// 		if (!response.ok) {
// 			if (response.status === 429 && retries > 0) {
// 				// Quota exceeded, wait and retry
// 				await new Promise((res) => setTimeout(res, backoff))
// 				return fetchWithRetry(url, options, retries - 1, backoff * 2)
// 			}
// 			throw new Error('Network response was not ok')
// 		}
// 		return await response.json()
// 	} catch (error) {
// 		if (retries > 0) {
// 			await new Promise((res) => setTimeout(res, backoff))
// 			return fetchWithRetry(url, options, retries - 1, backoff * 2)
// 		}
// 		throw error
// 	}
// }

// const fetchGlobalLeaderboardData = async (page = 1, limit = 25) => {
// 	isPending.value = true
// 	error.value = null
// 	const cacheKey = `global_leaderboard_${page}_${limit}`
// 	const cachedLeaderboard = await getCache(cacheKey)

// 	if (cachedLeaderboard) {
// 		isPending.value = false
// 		return cachedLeaderboard
// 	}

// 	try {
// 		const response = await fetch(
// 			`https://api.rabbittale.co/api/leaderboard/getGlobal?page=${page}&limit=${limit}`,
// 		)
// 		if (!response.ok) {
// 			throw new Error('Failed to fetch global leaderboard')
// 		}
// 		const leaderboardData = await response.json()
// 		await setCache(cacheKey, leaderboardData, 900)
// 		return leaderboardData
// 	} catch (err) {
// 		error.value = err.message
// 		throw err
// 	} finally {
// 		isPending.value = false
// 	}
// }

// export const useLeaderboard = () => {
// 	return {
// 		fetchGlobalLeaderboardData,
// 		isPending,
// 		error,
// 	}
// }
