import { ref } from 'vue'
import {
	fetchUserData,
	isPending as userIsPending,
	error as userError,
} from '@/api/user'
import {
	fetchGuildsData,
	isPending as guildIsPending,
	error as guildError,
} from '@/api/guilds'

const user = ref(null)
const isAuthenticated = ref(false)
const guilds = ref([])

const fetchUser = async (accessToken) => {
	try {
		const userObject = await fetchUserData(accessToken)
		user.value = userObject
		isAuthenticated.value = true
	} catch (err) {
		console.error(err)
		isAuthenticated.value = false
	}
}

const fetchGuilds = async (accessToken) => {
	try {
		const guildList = await fetchGuildsData(accessToken)
		guilds.value = guildList
	} catch (err) {
		console.error(err)
	}
}

const saveTokenToSessionStorage = (accessToken, expiresIn) => {
	const expiryDate = new Date().getTime() + parseInt(expiresIn) * 1000
	sessionStorage.setItem('access_token', accessToken)
	sessionStorage.setItem('expiry_date', expiryDate.toString())
}

const checkCallback = () => {
	const params = new URLSearchParams(window.location.search)
	const accessToken = params.get('access_token')
	const expiresIn = params.get('expires_in')

	if (accessToken && expiresIn) {
		saveTokenToSessionStorage(accessToken, expiresIn)
		fetchUser(accessToken)
		fetchGuilds(accessToken)
		window.location.href = '/'
	} else if (params.has('error')) {
		console.error(params.get('error'))
	}
}

const checkSessionStorage = () => {
	const accessToken = sessionStorage.getItem('access_token')
	const expiryDate = sessionStorage.getItem('expiry_date')

	if (accessToken && expiryDate) {
		if (new Date().getTime() < parseInt(expiryDate)) {
			fetchUser(accessToken)
			fetchGuilds(accessToken)
		} else {
			logout()
		}
	} else {
		logout()
	}
}

const logout = () => {
	sessionStorage.removeItem('access_token')
	sessionStorage.removeItem('expiry_date')
	sessionStorage.removeItem('guilds_data')
	user.value = null
	guilds.value = []
	isAuthenticated.value = false
}

export const useAuth = () => {
	return {
		user,
		guilds,
		isAuthenticated,
		userIsPending,
		userError,
		guildIsPending,
		guildError,
		fetchUser,
		fetchGuilds,
		saveTokenToSessionStorage,
		checkCallback,
		checkSessionStorage,
		logout,
	}
}
