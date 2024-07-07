const fetchUserData = async (accessToken) => {
	try {
		//console.log('Fetching user data with access token:', accessToken)
		const response = await fetch('https://discord.com/api/users/@me', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		if (!response.ok) {
			throw new Error(`Failed to fetch user data: ${response.statusText}`)
		}

		const userData = await response.json()
		console.log('Fetched user data:', userData)
		return {
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
	} catch (err) {
		console.error('Error fetching user data:', err)
		throw err
	}
}

export { fetchUserData }

// import Cookies from 'js-cookie'
// import { ref } from 'vue'

// const isPending = ref(false)
// const error = ref(null)

// const fetchUserData = async (accessToken) => {
// 	isPending.value = true
// 	error.value = null

// 	const cachedUser = Cookies.get('user_data')
// 	if (cachedUser) {
// 		isPending.value = false
// 		return JSON.parse(cachedUser)
// 	}

// 	try {
// 		const response = await fetch('https://discord.com/api/users/@me', {
// 			headers: {
// 				Authorization: `Bearer ${accessToken}`,
// 			},
// 		})
// 		if (!response.ok) {
// 			throw new Error('Failed to fetch user data')
// 		}
// 		const userData = await response.json()
// 		const userObject = {
// 			id: userData.id,
// 			username: userData.username,
// 			globalName: userData.global_name,
// 			avatarUrl: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.webp`,
// 			bannerUrl: userData.banner
// 				? `https://cdn.discordapp.com/banners/${userData.id}/${userData.banner}.webp`
// 				: null,
// 			bannerColor: userData.banner_color,
// 			locale: userData.locale,
// 		}
// 		Cookies.set('user_data', JSON.stringify(userObject), { expires: 1 }) // Cache for 1 day
// 		return userObject
// 	} catch (err) {
// 		error.value = err.message
// 		throw err
// 	} finally {
// 		isPending.value = false
// 	}
// }

// export { fetchUserData, isPending, error }
