<template>
  <Hero />
  <Leaderboard />
  <Servers :servers="displayedServers" :serverCount="serverCount" />
  <section class="mx-auto w-full max-w-screen-xl p-6 lg:py-10">
    <div class="grid grid-cols-1 gap-12 lg:gap-36">
      <Features v-for="(feature, index) in features" :key="index"
        :imageSrc="feature.imageSrc"
        :title="feature.title"
        :description="feature.description"
        :primaryButtonText="feature.primaryButtonText"
        :primaryButtonLink="feature.primaryButtonLink"
        :primaryButtonExternal="feature.primaryButtonExternal"
        :secondaryButtonText="feature.secondaryButtonText"
        :secondaryButtonLink="feature.secondaryButtonLink"
        :reverse="index % 2 !== 0"
      />
    </div>
  </section>
  <section class="relative z-10">
    <div class="absolute h-5/6 lg:h-3/4 w-full bg-background -z-10" />
    <div class="mx-auto w-full max-w-screen-xl text-center p-6 lg:py-10">
      <h2 class="text-white mx-auto max-w-xl font-bold text-4xl leading-tight">Tiny Rabbit is trusted and used by {{ serverCount }} servers</h2>
      <main class="mt-12">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <ServerCard v-for="(server, index) in allServers" :key="index"
            :link="server.link"
            :imageSrc="server.imageSrc"
            :serverName="server.serverName"
            :memberCount="server.memberCount"
            :isCommunity="server.isCommunity"
          />
        </div>
      </main>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount, watch } from 'vue'
import useSWRV, { mutate } from 'swrv'
import { compactFormatter } from '@/utils/formatter'
import Hero from '@/components/sections/Hero.vue'
import Leaderboard from '@/components/sections/Leaderboard.vue'
import Servers from '@/components/sections/Servers.vue'
import Features from '@/components/sections/Features.vue'
import ServerCard from '@/components/sections/ServerCrad.vue'
import { useBotGuilds } from '@/api/botGuilds'
import LocalStorageCache from 'swrv/dist/cache/adapters/localStorage'

const {
	data: botGuilds,
	error: botGuildError,
	isValidating: botGuildIsPending,
} = useBotGuilds()

const features = [
	{
		imageSrc: 'welcome_show.png',
		title: 'Lorem ipsum dolor sit amet.',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo quisquam illo vitae quia dolores optio rem quod nam inventore, incidunt, necessitatibus quibusdam consequatur dicta ut. Vitae dignissimos repellat voluptate cumque.',
		primaryButtonText: 'Add to Discord',
		primaryButtonLink:
			'https://discord.com/oauth2/authorize?client_id=1207315441614331904&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Fapi.rabbittale.co%2Fcallback&integration_type=0&scope=bot+identify+guilds+email+guilds.members.read+messages.read',
		primaryButtonExternal: true,
		secondaryButtonText: 'button',
		secondaryButtonLink: '#',
	},
	{
		imageSrc: 'hero.png',
		title: 'Lorem ipsum dolor sit amet.',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo quisquam illo vitae quia dolores optio rem quod nam inventore, incidunt, necessitatibus quibusdam consequatur dicta ut. Vitae dignissimos repellat voluptate cumque.',
		primaryButtonText: 'button',
		primaryButtonLink: '#',
		primaryButtonExternal: false,
		secondaryButtonText: 'button',
		secondaryButtonLink: '#',
	},
	{
		imageSrc: 'hero.png',
		title: 'Lorem ipsum dolor sit amet.',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo quisquam illo vitae quia dolores optio rem quod nam inventore, incidunt, necessitatibus quibusdam consequatur dicta ut. Vitae dignissimos repellat voluptate cumque.',
		primaryButtonText: 'button',
		primaryButtonLink: '#',
		primaryButtonExternal: false,
		secondaryButtonText: 'button',
		secondaryButtonLink: '#',
	},
]

const allServers = ref([])
const displayedServers = ref([])

const serverCount = computed(() => allServers.value.length)

const updateDisplayedServers = () => {
  const screenWidth = window.innerWidth
  let serversToDisplay

  const sortedServers = allServers.value.sort((a, b) => b.memberCount - a.memberCount)

  if (screenWidth >= 1024) {
    serversToDisplay = sortedServers.slice(0, 8)
  } else {
    serversToDisplay = sortedServers.slice(0, 3)
  }

  displayedServers.value = serversToDisplay.map((guild) => ({
    link: guild.link,
    imageSrc: guild.imageSrc,
    serverName: guild.serverName,
    memberCount: guild.memberCount,
    isCommunity: guild.isCommunity,
  }))
}

const handleResize = () => {
	updateDisplayedServers()
}

watch(
	botGuilds,
	(server) => {
		allServers.value = server.map((guild) => ({
			link: guild.isCommunity ? guild.inviteLink : '',
			imageSrc: guild.icon
				? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=4096`
				: '',
			serverName: guild.name,
			memberCount: guild.memberCount,
			isCommunity: guild.isCommunity,
		}))
		updateDisplayedServers()
	},
	{ immediate: true },
)

onMounted(() => {
	window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
	window.removeEventListener('resize', handleResize)
})
</script>
