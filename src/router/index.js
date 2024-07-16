import { createRouter, createWebHistory } from 'vue-router'
import Guild from '@/pages/Guild.vue'
import GuildCommands from '@/pages/GuildCommands.vue'
import LandingPage from '@/pages/LandingPage.vue'
import PublicServers from '@/pages/PublicServers.vue'
import Help from '@/pages/Help.vue'
import Status from '@/pages/Status.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Premium from '@/pages/Premium.vue'
import ToS from '@/pages/Tos.vue'

const routes = [
	{
		path: '/',
		redirect: '/bot',
	},
	{
		path: '/bot',
		name: 'Bot',
		component: LandingPage,
		meta: {
			title: 'The future-rich Discord bot',
			describtion: 'Bot page of Tiny Rabbit',
		},
	},
	{
		path: '/public-servers',
		name: 'Public Servers',
		component: PublicServers,
		meta: {
			title: 'Public Servers',
			describtion: 'Public Servers page of Tiny Rabbit',
		},
	},
	{
		path: '/status',
		name: 'Status',
		component: Status,
		meta: {
			title: 'Status Servers',
			describtion: 'Status Servers page of Tiny Rabbit',
		},
	},
	{
		path: '/help',
		name: 'Help',
		component: Help,
		meta: {
			title: 'Help Servers',
			describtion: 'Help Servers page of Tiny Rabbit',
		},
	},
	{
		path: '/dashboard',
		name: 'Dashbaord',
		component: Dashboard,
		meta: {
			title: 'Dashboard',
			describtion: 'Dashboard page of Tiny Rabbit',
		},
	},
	{
		path: '/premium',
		name: 'Premium',
		component: Premium,
		meta: {
			title: 'Premium',
			describtion: 'Premium page of Tiny Rabbit',
		},
	},
	{
		path: '/tos',
		name: 'ToS',
		component: ToS,
		meta: {
			title: 'Terms of Service',
			describtion: 'Terms of Service page of Tiny Rabbit',
		},
	},
	{
		path: '/manage/:guildID',
		name: 'Guild',
		component: Guild,
		meta: {
			title: 'Guild',
			describtion: 'Guild page of Tiny Rabbit',
		},
	},
	{
		path: '/manage/:guildID/commands',
		name: 'Commands',
		component: GuildCommands,
		meta: {
			title: 'Commands',
			describtion: 'Commands page of Tiny Rabbit',
		},
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, _from, next) => {
	const { title, description } = to.meta
	const defaultTitle = 'Tiny Rabbit'
	const defaultDescription =
		'Tiny Rabbit is a discord bot with level up system and much more!'

	document.title = title ? `${defaultTitle} - ${title}` : defaultTitle

	const metaTags = [
		{
			name: 'title',
			content: title ? `${defaultTitle} - ${title}` : defaultTitle,
		},
		{ name: 'description', content: description || defaultDescription },
		{
			property: 'og:title',
			content: title ? `${defaultTitle} - ${title}` : defaultTitle,
		},
		{
			property: 'og:description',
			content: description || defaultDescription,
		},
		{
			name: 'twitter:title',
			content: title ? `${defaultTitle} - ${title}` : defaultTitle,
		},
		{
			name: 'twitter:description',
			content: description || defaultDescription,
		},
	]

	for (const { name, property, content } of metaTags) {
		let element = document.querySelector(
			`head meta[${name ? `name="${name}"` : `property="${property}"`}]`,
		)
		if (!element) {
			element = document.createElement('meta')
			if (name) element.setAttribute('name', name)
			if (property) element.setAttribute('property', property)
			document.head.appendChild(element)
		}
		element.setAttribute('content', content)
	}

	next()
})

export default router
