<script setup>
import { onMounted, computed } from 'vue'
import useAuth from '@/utils/auth'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'
import { useGuilds } from '@/api/guilds'
import { Button } from '@/components/ui/button'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'

const router = useRouter()
const accessToken = sessionStorage.getItem('access_token')

const {
	guilds,
	isPending: guildIsPending,
	error: guildError,
} = useGuilds(accessToken)
const { user, isAuthenticated, checkCallback, checkSession } = useAuth()

const handleGuildClick = async (guild) => {
	if (!guild.isAdmin) {
		toast.warning(`You don't have admin rights in ${guild.name}.`)
		return
	}

	if (!guild.isBotMember) {
		window.location.href = `https://discord.com/oauth2/authorize?client_id=1207315441614331904&permissions=8&guild_id=${guild.id}&response_type=code&redirect_uri=https%3A%2F%2Fapi.rabbittale.co%2Fcallback&scope=bot%20identify%20guilds%20email%20guilds.members.read%20messages.read`
		return
	}

	window.location.href = `/manage/${guild.id}`
}

onMounted(() => {
	checkCallback()
	checkSession()

	if (!isAuthenticated.value) {
		router.push('/')
	}
})

const loading = computed(() => guildIsPending.value || !accessToken)
const error = computed(() => guildError.value)

// Filter the guilds to only include those where the user is an admin
const adminGuilds = computed(() =>
	guilds.value ? guilds.value.filter((guild) => guild.isAdmin) : [],
)
</script>

<template>
  <section v-if="!accessToken" class="mt-10 mx-auto px-10 flex flex-col items-center relative w-[min(100%,_948px)]">
    <h1 class="text-4xl font-bold text-white mb-4">You must be logged in to view servers.</h1>
  </section>
  <section v-else class="mt-10 mx-auto px-10 flex flex-col items-center relative w-[min(100%,_948px)]">
    <h1 class="text-4xl font-bold text-white mb-4">Select a server</h1>
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full my-10">
      <template v-if="loading">
        <article v-for="i in 6" :key="i" class="relative overflow-hidden group">
          <header class="relative flex items-center rounded-2xl bg-backgroundSecondary h-40 w-full overflow-hidden">
            <Skeleton class="absolute inset-0 scale-125 blur-md opacity-30 h-full w-full bg-muted-foreground" />
            <Skeleton class="relative z-10 size-20 rounded-full mx-auto bg-muted-foreground" />
          </header>
          <main class="flex justify-between mt-4">
            <div class="mr-4 w-full">
              <Skeleton class="h-6 w-3/4 mb-2 bg-muted-foreground" />
              <Skeleton class="h-4 w-1/2 bg-muted-foreground" />
            </div>
            <Skeleton class="h-10 w-20 bg-muted-foreground" />
          </main>
        </article>
      </template>
      <template v-else>
        <article
          v-for="guild in adminGuilds"
          :key="guild.id"
          :class="{
            'opacity-50 cursor-not-allowed': !guild.isAdmin,
          }"
          class="relative overflow-hidden group"
          @click="handleGuildClick(guild)"
        >
          <header class="relative flex items-center rounded-2xl bg-backgroundSecondary h-40 w-full overflow-hidden">
            <div class="absolute inset-0 scale-125 blur-md opacity-30">
              <img :src="guild.iconUrl" alt="Guild Icon" class="w-full h-full object-cover" />
            </div>
            <img :src="guild.iconUrl" alt="Guild Icon" class="relative z-10 size-20 rounded-full mx-auto outline outline-white outline-offset-4" />
          </header>
          <main class="flex justify-between mt-4">
            <div class="mr-4">
              <h3 class="font-bold text-white line-clamp-2">{{ guild.name }}</h3>
              <span class="text-sm text-muted-foreground">{{ guild.isBotMember ? 'Rabbit Master' : 'Owner' }}</span>
            </div>
            <Button @click="handleGuildClick(guild)">
              {{ guild.isBotMember ? 'Edit' : 'Setup' }}
            </Button>
          </main>
        </article>
      </template>
    </section>
  </section>
</template>
