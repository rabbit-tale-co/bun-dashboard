import useSWRV from 'swrv'
import LocalStorageCache from 'swrv/dist/cache/adapters/localStorage'

// Fetch bot guilds data function
const fetchBotGuildsData = async () => {
  const response = await fetch('https://api.rabbittale.co/api/guilds/botGuilds')

  if (!response.ok) {
    throw new Error('Failed to fetch guilds')
  }

  return await response.json()
}

// Custom hook to use SWRV for bot guilds data
const useBotGuilds = () => {
  const { data, error, isValidating } = useSWRV(
    'bot_guilds_data', // Unique key for the cache
    fetchBotGuildsData, // Fetch function
    {
      cache: new LocalStorageCache('bot_guilds_data'),
      revalidateOnFocus: false,
      ttl: 3600 * 1000, // Time to live for cache (1 hour)
      dedupingInterval: 3600 * 1000, // Interval to dedupe requests (1 hour)
    }
  )

  return {
    data,
    error,
    isValidating,
  }
}

export { useBotGuilds, fetchBotGuildsData }


// Custom hook to use SWRV for bot guilds data
// const useBotGuilds = () => {
// 	const { data, error, isValidating } = useSWRV(
// 		'bot_guilds_data', // Unique key for the cache
// 		fetchBotGuildsData, // Fetch function
// 		{
// 			cache: new LocalStorageCache('bot_guilds_data'),
// 			revalidateOnFocus: false,
// 			ttl: 3600 * 1000, // Time to live for cache (1 hour)
// 			dedupingInterval: 3600 * 1000, // Interval to dedupe requests (1 hour)
// 		},
// 	)

// 	return {
// 		data,
// 		error,
// 		isValidating,
// 	}
// }

// import { setCache, getCache } from '@/storage/localStorage'
// import { ref } from 'vue'

// // Reactive variables for loading state and error handling
// const isPending = ref(false)
// const error = ref(null)

// /**
//  * Fetches guild data where the bot is a member.
//  * @returns {Promise} - A promise that resolves to a list of guilds.
//  */
// const fetchBotGuildsData = async () => {
// 	isPending.value = true
// 	error.value = null

// 	// Attempt to retrieve cached guild data
// 	const cachedGuilds = getCache('bot_guilds_data')
// 	if (cachedGuilds) {
// 		isPending.value = false
// 		return cachedGuilds
// 	}

// 	try {
// 		// Fetch guild data from your API
// 		const response = await fetch(
// 			'https://api.rabbittale.co/api/guilds/botGuilds'
// 		)

// 		// Check if the response is successful
// 		if (!response.ok) {
// 			throw new Error('Failed to fetch guilds')
// 		}

// 		const guildsList = await response.json()

// 		// Cache the fetched guild data
// 		setCache('bot_guilds_data', guildsList, 3600) // Cache for 1 hour
// 		return guildsList
// 	} catch (err) {
// 		error.value = err.message
// 		throw err
// 	} finally {
// 		isPending.value = false
// 	}
// }

// export { fetchBotGuildsData, isPending, error }
