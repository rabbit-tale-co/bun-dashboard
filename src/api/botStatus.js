import useSWRV from 'swrv'

const fetchBotStatusData = async () => {
	const response = await fetch('https://api.rabbittale.co/api/bot-status')
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`)
	}
	const data = await response.json()
	return { status: data.status, version: data.version }
}

// Custom hook to use SWRV for bot status data
const useBotStatus = () => {
	const { data, error, isValidating } = useSWRV(
		'bot_status_data', // Unique key for the cache
		fetchBotStatusData, // Fetch function
		{
			refreshInterval: 15000, // Refresh interval in milliseconds
			dedupingInterval: 15000, // Interval to dedupe requests
		},
	)

	return {
		data,
		error,
		isValidating,
	}
}

export { fetchBotStatusData, useBotStatus }

// import { ref } from 'vue'

// const loading = ref(false)
// const error = ref(null)

// const fetchBotStatusData = async () => {
// 	const controller = new AbortController()
// 	const timeoutId = setTimeout(() => controller.abort(), 5000)
// 	loading.value = true
// 	error.value = null

// 	try {
// 		const response = await fetch('https://api.rabbittale.co/api/bot-status', {
// 			signal: controller.signal,
// 		})

// 		clearTimeout(timeoutId)

// 		if (!response.ok) {
// 			throw new Error(`HTTP error! Status: ${response.status}`)
// 		}

// 		const data = await response.json()
// 		return { status: data.status, version: data.version }
// 	} catch (err) {
// 		if (err instanceof Error && err.name === 'AbortError') {
// 			return { status: 'offline', version: 'unknown' }
// 		}

// 		error.value =
// 			err instanceof Error ? err.message : 'An unknown error occurred'
// 		throw err

// 	} finally {
// 		loading.value = false
// 	}
// }

// export { fetchBotStatusData, loading, error }
