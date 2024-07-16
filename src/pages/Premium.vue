<script setup>
import { useBotGuilds } from '@/api/botGuilds'
import PriceCard from '@/components/PriceCard.vue'
import PremiumTable from '@/components/PremiumTable.vue'
import { SolidCarrot } from '@/components/ui/icons'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const {
	data: botGuilds,
	error: botGuildError,
	isValidating: botGuildIsPending,
} = useBotGuilds()

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

<template>
   <section class="mt-10 mx-auto p-10 flex flex-col items-center relative max-w-screen-xl">
      <div class="items-center flex flex-col">
         <div class="flex items-center gap-4 mt-10">
            <SolidCarrot size="56" class="text-premium mb-4 drop-shadow-golden-carrot"/>
            <h2 class="text-4xl font-bold uppercase text-premium mb-4">Golden Carrot</h2>
         </div>
         <h1 class="text-5xl font-bold text-center text-white mb-8">Take your server to the next level!</h1>
         <p class="text-muted-foreground text-lg mb-4 text-center max-w-lg">Unlock the full potential of your server by getting access to all Tiny Rabbit’s features and plugins.</p>
         <PriceCard />
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
  <PremiumTable />
</template>