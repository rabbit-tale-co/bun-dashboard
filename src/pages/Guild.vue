<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useAuth from '@/utils/auth'
import { useGuildData } from '@/hooks/useGuildData'
import WelcomeFormEasy from '@/components/WelcomeFormEasy.vue'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import Button from '@/components/ui/button/Button.vue'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import { ref } from 'vue'
import {
	OutlineCarrot,
	OutlineCheckCrFr,
	OutlineCommand,
	OutlinePlus,
	OutlineSend,
	SolidCarrot,
	SolidCommand,
	SolidMicrochip,
	SolidSend,
} from '@/components/ui/icons'
import { toast } from 'vue-sonner'
import { LineChart } from '@/components/ui/chart-line'
import { usePlugins } from '@/hooks/usePlugins'

const data = [
	{
		year: 2010,
		'Export Growth Rate': 1.25,
		'Import Growth Rate': 2.35,
	},
	{
		year: 2011,
		'Export Growth Rate': 1.24,
		'Import Growth Rate': 2.34,
	},
	{
		year: 2012,
		'Export Growth Rate': 1.25,
		'Import Growth Rate': 3.39,
	},
	{
		year: 2013,
		'Export Growth Rate': 1.22,
		'Import Growth Rate': 4.3,
	},
	{
		year: 2014,
		'Export Growth Rate': 1.2,
		'Import Growth Rate': 5.35,
	},
	{
		year: 2015,
		'Export Growth Rate': 1.17,
		'Import Growth Rate': 3.39,
	},
	{
		year: 2016,
		'Export Growth Rate': 1.16,
		'Import Growth Rate': 6.41,
	},
	{
		year: 2017,
		'Export Growth Rate': 1.13,
		'Import Growth Rate': 7.44,
	},
	{
		year: 2018,
		'Export Growth Rate': 1.07,
		'Import Growth Rate': 8.45,
	},
	{
		year: 2019,
		'Export Growth Rate': 1.03,
		'Import Growth Rate': 10.47,
	},
	{
		year: 2020,
		'Export Growth Rate': 1.92,
		'Import Growth Rate': 4.48,
	},
	{
		year: 2021,
		'Export Growth Rate': 2.82,
		'Import Growth Rate': 5.51,
	},
]

const icons = {
	SolidSend,
	OutlineSend,
	SolidCommand,
	OutlineCommand,
}

const router = useRouter()

const { isAuthenticated, checkSession } = useAuth()
const { guild, roles, channels, loading, error } = useGuildData()
const {
	plugins,
	loading: pluginsLoading,
	error: pluginsError,
	fetchPlugins,
	togglePluginState,
} = usePlugins()

const togglePlugin = async (plugin) => {
	const newState = !plugin.active
	await togglePluginState(guild.value.id, plugin.id, newState)
}

const getRoleStyle = (role) => {
	const color =
		role.color === 0
			? '#94a3b8'
			: `#${role.color.toString(16).padStart(6, '0')}`
	return {
		class: 'inline-block size-3 rounded-full mr-2',
		style: `background-color: ${color}`,
	}
}

const copyServerID = async (id) => {
	const copyPromise = navigator.clipboard.writeText(id)
	toast.promise(copyPromise, {
		loading: 'Copying server ID...',
		success: 'Server ID copied to clipboard!',
		error: 'Failed to copy server ID.',
	})
}

onMounted(async () => {
	checkSession()
	if (!isAuthenticated.value) {
		router.push('/')
		return
	}
	if (guild.value?.id) {
		await fetchPlugins(guild.value.id)
	}
})
</script>

<template>
   <section
      class="prose max-w-full dark:prose-invert prose-p:my-2 prose-headings:font-semibold prose-img:rounded-3xl space-y-6"
   >
      <p v-if="loading">Loading...</p>
      <p v-if="error">{{ error }}</p>
      <header v-if="!loading && !error && guild" class="flex items-start space-x-4">
         <img
            v-if="guild.icon"
            :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=4096`"
            :alt="guild.name"
            class="size-14 rounded-full not-prose"
         />
         <div>
            <h3 class="my-0">{{ guild.name }}</h3>
            <p class="!my-0 leading-tight">
               {{ guild.description || 'No description available.' }}
            </p>
         </div>
      </header>

      <article class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card class="flex-col h-full">
            <LineChart
               :data="data"
               index="year"
               class="h-[200] space-y-4 p-5"
               :categories="['Export Growth Rate', 'Import Growth Rate']"
               :y-formatter="(tick, i) => {
                  return typeof tick === 'number'
                  ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
                  : ''
               }"
            />
         </Card>
          <Card class="flex-col h-full">
            <LineChart
               :data="data"
               index="year"
               class="h-[200] space-y-4 p-5"
               :categories="['Export Growth Rate', 'Import Growth Rate']"
               :y-formatter="(tick, i) => {
                  return typeof tick === 'number'
                  ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
                  : ''
               }"
            />
         </Card>
      </article>

      <article
         class="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4"
         v-if="!loading && !error && guild"
      >
         <Card class="flex-col h-full">
            <CardHeader>
               <div class="flex justify-between mb-2">
                  <div class="flex size-14 bg-primary items-center justify-center rounded-xl">
                     <SolidMicrochip size="32" class="text-primary-foreground" />
                  </div>
                  <Button variant="ghost" size="sm" @click="copyServerID(guild.id)">Copy server ID</Button>
               </div>
               <CardTitle class="text-lg not-prose">
                  Server Info
               </CardTitle>
            </CardHeader>
            <CardContent class="flex-grow">
               <ul class="text-sm my-0">
                  <li>
                     <strong>Member Count:</strong>
                     {{ guild.memberCount }}
                  </li>
                  <li>
                     <strong>Roles Count:</strong> {{ roles.length }}
                  </li>
               </ul>
            </CardContent>
         </Card>
         <Card
            v-if="!loading && !error && guild"
            class="flex flex-col h-full"
         >
            <CardHeader>
               <div class="flex justify-between mb-2">
                  <div class="flex size-14 bg-primary items-center justify-center rounded-xl">
                     <SolidCarrot size="32" class="text-primary-foreground" />
                  </div>
               </div>
               <CardTitle class="text-lg not-prose">
                  Channels Info
               </CardTitle>
            </CardHeader>
            <CardContent class="flex-grow">
               <ul class="text-sm my-0">
                  <li>
                     <strong>Category Count:</strong>
                     {{ guild.categoryCount }}
                  </li>
                  <li>
                     <strong>Text Channel Count:</strong>
                     {{ guild.textChannelCount }}
                  </li>
                  <li>
                     <strong>Voice Channel Count:</strong>
                     {{ guild.voiceChannelCount }}
                  </li>
               </ul>
            </CardContent>
         </Card>
      </article>

      <h2 v-if="!loading && !error && !pluginsLoading && !pluginsError && guild">Plugins</h2>
      <article class="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4" v-if="!loading && !error && !pluginsLoading && !pluginsError && guild">
         <router-link
            v-for="(plugin, index) in plugins"
            class="not-prose"
            :to="{ name: 'PluginConfig', params: { guildID: guild.id, pluginID: plugin.id } }"
            :key="plugin.id"
         >
            <Card class="flex flex-col h-full dark:hover:bg-card-hover hover:bg-card-hover/30">
               <CardHeader class="flex-grow">
                  <div class="flex justify-between mb-2">
                     <div class="flex size-14 bg-primary items-center justify-center rounded-xl">
                        <component :is="icons[plugin.iconSolid]" size="32" class="text-primary-foreground" />
                     </div>
                     <Button v-if="plugin.premium" variant="premium" size="smIcon">
                        <SolidCarrot class="mr-1" /> Premium
                     </Button>
                  </div>
                  <CardTitle class="text-lg">{{ plugin.title }}</CardTitle>
                  <CardDescription>{{ plugin.description }}</CardDescription>
               </CardHeader>
               <CardFooter>
                  <Button @click.prevent="togglePlugin(plugin)" v-if="plugin.enabled" variant="accent" size="defaultIcon">
                     <OutlineCheckCrFr class="mr-2" />
                     Active
                  </Button>
                  <Button @click.prevent="togglePlugin(plugin)" v-else variant="secondary">
                     <OutlinePlus class="mr-2" />
                     Enable
                  </Button>
               </CardFooter>
            </Card>
         </router-link>
      </article>
   </section>

   <!-- <Select v-if="!loading && !error && roles.length > 0">
         <SelectTrigger class="w-[280px]">
            <SelectValue placeholder="Select a role" />
         </SelectTrigger>
         <SelectContent>
            <SelectGroup>
               <SelectLabel>Roles</SelectLabel>
               <SelectItem
                  v-for="role in roles"
                  :key="role.id"
                  :value="role.id"
                  class="text-muted-foreground"
               >
                  <div class="flex items-center">
                     <span
                        :class="getRoleStyle(role).class"
                        :style="getRoleStyle(role).style"
                     />
                     {{ role.name }}
                  </div>
               </SelectItem>
            </SelectGroup>
         </SelectContent>
      </Select> -->
      <!-- <Dialog>
         <DialogTrigger as-child>
            <Button>
               Set Welcome Message
            </Button>
         </DialogTrigger>
         - beta
         <DialogContent>
            <DialogHeader>
            <DialogTitle>Welcome Message</DialogTitle>
            <DialogDescription>
                  Customize the welcome message for your server.
            </DialogDescription>
            </DialogHeader>
            <WelcomeFormEasy
               v-if="!loading && !error && guild"
               :serverId="guild.id"
               :channels="channels"
            />
         </DialogContent>
      </Dialog> -->
</template>
