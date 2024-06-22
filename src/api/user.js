import { setCache, getCache } from '../utils/cache'
import { ref } from 'vue'

const isPending = ref(false)
const error = ref(null)

const fetchUserData = async (accessToken) => {
	isPending.value = true
	error.value = null
	const cachedUser = getCache('user_data')
	if (cachedUser) {
		isPending.value = false
		return cachedUser
	}

	try {
		const response = await fetch('https://discord.com/api/users/@me', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		if (!response.ok) {
			throw new Error('Failed to fetch user data')
		}
		const userData = await response.json()
		const userObject = {
			id: userData.id,
			username: userData.username,
			globalName: userData.global_name,
			avatarUrl: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.webp`,
			bannerUrl: userData.banner
				? `https://cdn.discordapp.com/banners/${userData.id}/${userData.banner}.webp`
				: null,
			bannerColor: userData.banner_color,
			locale: userData.locale,
		}
		setCache('user_data', userObject, 3600) // Cache for 1 hour
		return userObject
	} catch (err) {
		error.value = err.message
		throw err
	} finally {
		isPending.value = false
	}
}

export { fetchUserData, isPending, error }
