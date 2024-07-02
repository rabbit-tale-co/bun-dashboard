import { openDB } from 'idb'

const DB_NAME = 'leaderboardDB'
const STORE_NAME = 'leaderboardStore'
const VERSION = 1

const initDB = async () => {
	return openDB(DB_NAME, VERSION, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
			}
		},
	})
}

export const setCache = async (key, data, ttl) => {
	const db = await initDB()
	const expiry = Date.now() + ttl * 1000
	const cacheItem = { id: key, data, expiry }
	console.log(`Setting cache for key: ${key}`, cacheItem)
	await db.put(STORE_NAME, cacheItem)
}

export const getCache = async (key) => {
	const db = await initDB()
	const cacheItem = await db.get(STORE_NAME, key)
	console.log(`Getting cache for key: ${key}`, cacheItem)
	if (cacheItem) {
		if (cacheItem.expiry > Date.now()) {
			return cacheItem.data
		}
		await db.delete(STORE_NAME, key)
	}
	return null
}

export const clearExpiredCache = async () => {
	const db = await initDB()
	const tx = db.transaction(STORE_NAME, 'readwrite')
	const store = tx.objectStore(STORE_NAME)
	const allKeys = await store.getAllKeys()

	for (const key of allKeys) {
		const cacheItem = await store.get(key)
		if (cacheItem.expiry <= Date.now()) {
			await store.delete(key)
		}
	}
}
