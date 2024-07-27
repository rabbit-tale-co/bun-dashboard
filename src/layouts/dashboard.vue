<template>
   <div class="flex min-h-screen w-full bg-background">
      <aside class="fixed top-0 left-0 h-full md:w-24 lg:w-80 hidden md:flex flex-col">
         <div class="flex h-20 items-center px-4 lg:px-8 relative">
            <router-link to="/" class="flex items-center gap-2 max-lg:ml-4 font-semibold">
               <Logo class="size-8 mr-2"/>
               <span class="whitespace-nowrap text-2xl flex items-center max-lg:hidden">Tiny Rabbit</span>
            </router-link>
            <Badge variant="outline" class="ml-3 max-lg:hidden">alpha</Badge>
         </div>
         <div class="flex-1 overflow-y-auto max-lg:ml-5 mt-6">
            <nav class="grid items-start lg:px-5 max-lg:w-14 text-sm font-medium mb-6">
               <ul class="flex flex-col space-y-2">
                  <li v-for="(route, i) in routes" :key="i" class="group hover:cursor-pointer rounded-full">
                     <Button as-child class="w-full justify-start h-14 max-lg:size-14" :variant="isActive(route.path) ? 'secondary' : 'ghost'">
                        <router-link :to="route.path">
                           <component class="lg:mr-2" :is="isActive(route.path) ? route.iconSolid : route.iconOutline" />
                           <span class="max-lg:hidden">{{ route.title }}</span>
                        </router-link>
                     </Button>
                  </li>
               </ul>
            </nav>
            <div v-for="(items, category) in categorizedItems" :key="category">
               <h4 class="lg:px-9 max-lg:hidden mb-4 text-xs text-muted-foreground font-bold uppercase">{{ category }}</h4>
               <nav class="grid items-start lg:px-5 max-lg:w-14 text-sm font-medium mb-6">
                  <ul class="flex flex-col space-y-2">
                     <li v-for="(item, i) in items" :key="i" class="group hover:cursor-pointer rounded-full">
                        <Button as-child class="w-full justify-start h-14 max-lg:size-14 relative pl-8" :variant="isActive(item.path) ? 'secondary' : 'ghost'">
                           <router-link :to="item.path">
                              <span class="size-1.5 rounded-full absolute left-3" :class="item.enabled ? 'bg-primary' : 'bg-muted-foreground/50'" />
                              <component class="lg:mr-2" :is="isActive(item.path) ? icons[item.iconSolid] : icons[item.iconOutline]" />
                              <span class="max-lg:hidden">{{ item.title }}</span>
                              <Badge v-if="item.premium" class="ml-auto p-1.5 max-lg:hidden" variant="premium">
                                 <SolidCarrot size="20" />
                              </Badge>
                           </router-link>
                        </Button>
                     </li>
                  </ul>
               </nav>
            </div>
         </div>
      </aside>
      <main class="flex flex-1 h-full flex-col md:ml-24 lg:ml-80 z-10">
         <header class="flex h-20 items-center gap-4 px-4 lg:px-10">
            <span class="whitespace-nowrap max-md:hidden -translate-x-4 text-2xl flex items-center lg:hidden">Tiny Rabbit <Badge variant="outline" class="ml-3">alpha</Badge></span>
            <Sheet>
               <SheetTrigger as-child>
                  <Button variant="outline" size="icon" class="shrink-0 md:hidden">
                     <Menu class="h-5 w-5" />
                     <span class="sr-only">Toggle navigation menu</span>
                  </Button>
               </SheetTrigger>
               <SheetContent side="left" class="flex flex-col">
                  <nav class="grid gap-2 text-lg font-medium">
                     <a href="#" class="flex items-center gap-2 text-lg font-semibold">
                        <img src="../assets/rabbit_tale_logo.svg" alt="logo" class="size-6" />
                        <span class="sr-only">Tiny Rabbit Bot</span>
                     </a>
                     <a href="#" class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-2 py-4 text-muted-foreground hover:text-foreground">
                        <OutlineGridThree />
                        Dashboard
                     </a>
                     <a href="#" class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-2 py-4 text-foreground hover:text-foreground">
                        <OutlineCommand />
                        Commands
                        <Badge class="ml-auto flex h-5 px-1.5 shrink-0 items-center justify-center rounded-full">
                           New
                        </Badge>
                     </a>
                  </nav>
               </SheetContent>
            </Sheet>
            <nav class="ml-auto flex space-x-3 items-center">
               <Button variant="premium" as-child  size="defaultIcon">
                  <router-link to="/premium">
                     <SolidCarrot class="mr-2"/>
                     Golden Carrot
                  </router-link>
               </Button>
               <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                     <Button variant="secondary" size="icon" class="rounded-full">
                        <Avatar v-if="user">
                           <AvatarImage :src="user.avatarUrl" :alt="user.username" />
                           <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <CircleUser class="h-5 w-5" />
                        <span class="sr-only">Toggle user menu</span>
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuLabel>My Account</DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem>Settings</DropdownMenuItem>
                     <DropdownMenuItem>Support</DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </nav>
         </header>
         <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10 overflow-y-auto bg-backgroundSecondary md:rounded-tl-2xl">
            <router-view />
         </main>
      </main>
   </div>
</template>

<script setup>
import { CircleUser, Menu } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
	OutlineGridThree,
	OutlineCommand,
	SolidCarrot,
	SolidGridThree,
	SolidCommand,
	SolidSend,
	OutlineSend,
} from '@/components/ui/icons'
import Footer from '@/components/Footer.vue'
import useAuth from '@/utils/auth'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Logo } from '@/components/ui/icons'
import { usePlugins } from '@/hooks/usePlugins'
import { setGuildID } from '@/api/guildId'
import { onUnmounted } from 'vue'

const route = useRoute()
const router = useRouter()

const icons = {
	SolidSend,
	OutlineSend,
	SolidCommand,
	OutlineCommand,
}

const saveGuildID = (guildID) => {
	localStorage.setItem('guildID', guildID)
}

const guildID = ref(
	route.params.guildID || sessionStorage.getItem('guildID') || '',
)

setGuildID(guildID.value)

const routes = computed(() => [
	{
		path: `/manage/${guildID.value}`,
		title: 'Dashboard',
		iconSolid: SolidGridThree,
		iconOutline: OutlineGridThree,
	},
])

const { plugins, fetchPlugins } = usePlugins()

const categorizedItems = computed(() => {
	const categories = {}
	if (Array.isArray(plugins.value)) {
		for (let i = 0; i < plugins.value.length; i++) {
			const plugin = plugins.value[i]
			if (!categories[plugin.category]) {
				categories[plugin.category] = []
			}
			categories[plugin.category].push({
				path: `/manage/${guildID.value}/${plugin.id}`,
				title: plugin.title,
				iconSolid: plugin.iconSolid,
				iconOutline: plugin.iconOutline,
				premium: plugin.premium,
				enabled: plugin.enabled,
			})
		}
	}
	return categories
})

const currentRoute = computed(() => route.path || '')

const isActive = (path) => {
	return currentRoute.value?.toLowerCase().endsWith(path.toLowerCase())
}

const handleNavigation = (path) => {
	router.push(path)
}

const { user, checkSession } = useAuth()

const updatePluginStatus = (event) => {
	const { pluginId, enabled } = event.detail
	plugins.value = plugins.value.map((plugin) =>
		plugin.id === pluginId ? { ...plugin, enabled } : plugin,
	)
}

onMounted(() => {
	if (guildID.value) {
		saveGuildID(guildID.value)
	}
	checkSession()
	fetchPlugins(guildID.value)
	window.addEventListener('plugin-status-changed', updatePluginStatus)
})

onUnmounted(() => {
	window.removeEventListener('plugin-status-changed', updatePluginStatus)
})
</script>
