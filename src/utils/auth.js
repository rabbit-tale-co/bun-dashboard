import useSWRV from 'swrv'
import { ref, watchEffect } from 'vue'
import { fetchUserData } from '@/api/user'
import Cookies from 'js-cookie'

const user = ref(null)
const isAuthenticated = ref(false)

const fetchUser = async (accessToken) => {
    try {
        const userObject = await fetchUserData(accessToken)
        user.value = userObject
        Cookies.set('user_data', JSON.stringify(userObject), { expires: 1 }) // Cache for 1 day
        localStorage.setItem(
            'user_data',
            JSON.stringify({ ...userObject, expiresAt: Date.now() + 86_400_000 })
        ) // 1 day in ms
        isAuthenticated.value = true
    } catch (err) {
        console.error('Error during fetchUser:', err)
        throw err
    }
}

const saveTokenToSessionStorage = (accessToken) => {
    sessionStorage.setItem('access_token', accessToken)
}

const getAccessToken = () => {
    return sessionStorage.getItem('access_token')
}

const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user_data')
    if (storedUser) {
        const userObject = JSON.parse(storedUser)
        if (userObject.expiresAt > Date.now()) {
            user.value = userObject
            isAuthenticated.value = true
        } else {
            localStorage.removeItem('user_data')
        }
    }
}

const checkCallback = () => {
    const params = new URLSearchParams(window.location.search)
    const accessToken = params.get('access_token')

    if (accessToken) {
        saveTokenToSessionStorage(accessToken)
        fetchUser(accessToken)
            .then(() => {
                window.history.replaceState({}, document.title, '/') // Remove token from URL without redirect
            })
            .catch((err) => {
                console.error('Error during fetchUser in checkCallback:', err)
            })
    } else if (params.has('error')) {
        console.error('OAuth error:', params.get('error'))
    }
}

const checkSession = () => {
    const token = getAccessToken()
    if (!token) {
        logout()
    } else {
        loadUserFromLocalStorage()
    }
}

const isLoggedIn = () => {
    const token = getAccessToken()
    const storedUser = localStorage.getItem('user_data')
    return !!token && !!storedUser
}

const logout = () => {
    console.log('Logging out user')
    sessionStorage.removeItem('access_token')
    Cookies.remove('user_data')
    localStorage.removeItem('user_data')
    user.value = null
    isAuthenticated.value = false
}

const useAuth = () => {
    const accessToken = getAccessToken()

    if (accessToken && isLoggedIn()) {
        loadUserFromLocalStorage()
        return {
            fetchUser,
            user,
            error: ref(null),
            isValidating: ref(false),
            isAuthenticated,
            saveTokenToSessionStorage,
            checkCallback,
            checkSession,
            isLoggedIn,
            logout,
        }
    }

    let userData
    let error
    let isValidating

    if (accessToken) {
        ;({
            data: userData,
            error,
            isValidating,
        } = useSWRV(['user', accessToken], () => fetchUserData(accessToken), {
            revalidateOnFocus: false,
            refreshInterval: 60000, // 1 minute
            dedupingInterval: 60000,
            shouldRetryOnError: false,
        }))

        watchEffect(() => {
            if (!userData?.value) {
                isAuthenticated.value = false
                return
            }

            user.value = userData.value
            Cookies.set('user_data', JSON.stringify(userData.value), { expires: 1 }) // Cache for 1 day
            localStorage.setItem(
                'user_data',
                JSON.stringify({
                    ...userData.value,
                    expiresAt: Date.now() + 86400000,
                })
            ) // 1 day in ms
            isAuthenticated.value = true
        })
    } else {
        userData = ref(null)
        error = ref(null)
        isValidating = ref(false)
    }

    return {
        fetchUser,
        user,
        error,
        isValidating,
        isAuthenticated,
        saveTokenToSessionStorage,
        checkCallback,
        checkSession,
        isLoggedIn,
        logout,
    }
}

export default useAuth