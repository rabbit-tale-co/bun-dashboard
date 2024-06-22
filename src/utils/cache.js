export const setCache = (key, data, ttl) => {
	const expiry = new Date().getTime() + ttl * 1000
	const item = { data, expiry }
	localStorage.setItem(key, JSON.stringify(item))
}

export const getCache = (key) => {
	const itemStr = localStorage.getItem(key)
	if (!itemStr) return null

	const item = JSON.parse(itemStr)
	if (new Date().getTime() > item.expiry) {
		localStorage.removeItem(key)
		return null
	}
	return item.data
}
