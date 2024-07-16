<script setup>
import { onMounted, computed } from 'vue'
import AspectRatio from '@/components/ui/aspect-ratio/AspectRatio.vue'
import { useAuth } from '@/utils/auth'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'
import { useGuilds } from '@/utils/guilds'
import { Button } from '@/components/ui/button'

const {
	guilds,
	fetchGuilds,
	guildIsPending,
	guildError,
} = useGuilds()

const {user, isAuthenticated, checkCallback, checkSessionStorage} = useAuth()

const router = useRouter()

const accessToken = sessionStorage.getItem('access_token')

const handleGuildClick = async (guild) => {
	if (!guild.isAdmin) {
		if (!guild.isBotMember) {
			// Redirect to invite bot
			toast.warning(
				`You don't have access to invite Tiny Rabbit to ${guild.name}.`,
			)
			// window.location.href = `https://discord.com/oauth2/authorize?client_id=1207315441614331904&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Fapi.rabbittale.co%2Fcallback&integration_type=0&scope=bot+identify+guilds+email+guilds.members.read+messages.read`
			return
		}
		// Show toast message
		toast.warning(
			`Bot is already a member of ${guild.name}, but you are not an admin.`,
		)
		return
	}

	if (!guild.isBotMember) {
		// Redirect to invite bot if the user is an admin but the bot is not a member
		window.location.href = `https://discord.com/oauth2/authorize?client_id=1207315441614331904&permissions=8&guild_id=${guild.id}&response_type=code&redirect_uri=https%3A%2F%2Fapi.rabbittale.co%2Fcallback&scope=bot%20identify%20guilds%20email%20guilds.members.read%20messages.read`
		return
	}

	// Redirect to guild page
	window.location.href = `/manage/${guild.id}`
}

onMounted(() => {
	if (accessToken) {
		fetchGuilds(accessToken)
	}
	checkCallback()
	checkSessionStorage()

	if (!isAuthenticated.value) {
		router.push('/')
		return
	}
})

const loading = computed(() => guildIsPending.value || !accessToken)
const error = computed(() => guildError.value)
</script>

<template>
   <section v-if="!accessToken">
      <article>
         <h1>You must be logged in to view servers.</h1>
      </article>
   </section>
   <section v-else class="mt-10 mx-auto px-10 flex flex-col items-center relative w-[min(100%,_948px)]">
      <h1 class="text-4xl font-bold text-white mb-4">Select a server</h1>
      <p class="leading-3">
         Servers you're in ({{ guilds.length }}
         {{ guilds.length > 1 ? 'servers' : 'server' }})
      </p>
      <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full my-10">
            <article
            v-for="guild in guilds"
            :key="guild.id"
            :class="{
               'opacity-50 cursor-not-allowed': !guild.isAdmin,
            }"
            class="relative rounded-md overflow-hidden group"
            @click="handleGuildClick(guild)"
            >
            <header class="relative flex items-center rounded-sm bg-backgroundSecondary h-40 w-full overflow-hidden">
               <div class="absolute inset-0 scale-125 blur-md opacity-30">
                  <img :src="guild.iconUrl" alt="Guild Icon" class="w-full h-full object-cover" />
               </div>
               <img :src="guild.iconUrl" alt="Guild Icon" class="relative z-10 w-24 h-24 rounded-full mx-auto" />
            </header>
            <main class="flex justify-between mt-4">
               <div class="mr-4">
                  <h3 class="font-bold text-white line-clamp-2">{{ guild.name }}</h3>
                  <span class="text-sm text-muted-foreground">{{ guild.isAdmin ? 'Owner' : 'Bot Master' }}</span>
               </div>
               <Button :variant="guild.isBotMember ? 'default' : 'secondary'" @click="handleGuildClick(guild)">
                  {{ guild.isBotMember ? 'Go' : 'Setup' }}
               </Button>
            </main>
            </article>
      </section>
   </section>
   <!-- <section v-else>
      <article
         v-if="error"
      >
         <h1>Error loading servers: {{ error }}</h1>
      </article>
      <article v-else-if="loading">
         <h1>Looking for carrots...</h1>
      </article>
      <article
         v-else-if="guilds && user && guilds.length > 0"
         class="flex flex-col gap-16"
      >
         <section
            class="w-full flex flex-col items-center space-y-1"
         >
            <h1 class="mb-4 text-4xl font-bold text-white">Select a servera</h1>
            <p class="leading-3">
               Servers you're in ({{ guilds.length }}
               {{ guilds.length > 1 ? 'servers' : 'server' }})
            </p>
         </section>

         <ul
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 rounded-2xl overflow-hidden"
         >
            <li
               v-for="guild in guilds"
               :key="guild.id"
               :class="{
                  ' opacity-50 cursor-not-allowed': !guild.isAdmin,
               }"
               class="relative rounded-md overflow-hidden shadow-lg group"
            >
               <AspectRatio :ratio="1 / 1">
                  <div
                     @click="handleGuildClick(guild)"
                     class="flex w-full h-full cursor-pointer"
                  >
                     <div
                        class="w-full h-full bg-cover bg-center flex items-center justify-center relative"
                        :style="{ backgroundImage: `url(${guild.iconUrl})` }"
                     >
                        <div
                           class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                           <div
                              class="bg-[#000] bg-opacity-50 backdrop-blur-md p-4 rounded-lg text-center"
                           >
                              <p
                                 class="sm:text-xs md:text-sm lg:text-base font-semibold text-[#fff]"
                              >
                                 {{ guild.name }}
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </AspectRatio>
            </li>
         </ul>
      </article>
      <p
         v-else-if="user && guilds && guilds.length === 0"
         class="leading-7 mt-6"
      >
         You are not part of any guilds.
      </p>
   </section> -->
</template>
