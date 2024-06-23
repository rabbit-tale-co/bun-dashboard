<template>
   <div class="flex min-h-screen w-full">
      <aside class="fixed top-0 left-0 h-full md:w-24 lg:w-80 hidden md:flex flex-col">
         <div class="flex h-20 items-center px-4 lg:px-6 relative">
            <!-- <span class="absolute -right-2 -bottom-2 size-2 rounded-tl-lg bg-[#2e3038]"></span> -->
            <!-- border-b -->
            <router-link
               to="/"
               class="flex items-center gap-2 max-lg:ml-4 lg:-ml-2 font-semibold"
            >
               <Logo class="size-8 mr-2"/>
               <span class="whitespace-nowrap max-lg:hidden">Tiny Rabbit Bot <Badge variant="outline">alpha</Badge></span>
            </router-link>
         </div>
         <div class="flex-1 overflow-y-auto max-lg:ml-4 mt-6">
            <nav class="grid items-start px-2 text-sm font-medium lg:px-3">
               <ul class="flex flex-col space-y-2">
                  <li
                     v-for="(item, i) in items"
                     :key="i"
                     @click="handleNavigation(item.path)"
                     class="group hover:cursor-pointer rounded-full"
                  >
                     <router-link
                        :to="item.path"
                        class="flex max-lg:size-12 items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-primary/[.12]"
                        :class="{
                           'bg-primary text-primary-foreground hover:text-primary-foreground hover:!bg-primary/90':
                              isActive(item.path),
                        }"
                     >
                        <component
                           class="lg:mr-2"
                           :is="
                              isActive(item.path)
                                 ? item.iconSolid
                                 : item.iconOutline
                           "
                        />
                        <span class="max-lg:hidden">{{ item.title }}</span>
                     </router-link>
                  </li>
               </ul>
            </nav>
         </div>
      </aside>
      <main class="flex flex-1 flex-col md:ml-24 lg:ml-80 z-10">
         <header class="flex h-20 items-center gap-4 px-4 lg:px-6">
            <span class="whitespace-nowrap max-md:hidden -translate-x-4 lg:hidden">Tiny Rabbit Bot <Badge variant="outline">alpha</Badge></span>
            <Sheet>
               <SheetTrigger as-child>
                  <Button
                     variant="outline"
                     size="icon"
                     class="shrink-0 md:hidden"
                  >
                     <Menu class="h-5 w-5" />
                     <span class="sr-only">Toggle navigation menu</span>
                  </Button>
               </SheetTrigger>
               <SheetContent
                  side="left"
                  class="flex flex-col"
               >
                  <nav class="grid gap-2 text-lg font-medium">
                     <a
                        href="#"
                        class="flex items-center gap-2 text-lg font-semibold"
                     >
                        <img
                           src="../assets/rabbit_tale_logo.svg"
                           alt="logo"
                           class="size-6"
                        />
                        <span class="sr-only">Tiny Rabbit Bot</span>
                     </a>
                     <a
                        href="#"
                        class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-2 py-4 text-muted-foreground hover:text-foreground"
                     >
                        <OutlineGridThree />
                        Dashboard
                     </a>
                     <a
                        href="#"
                        class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-2 py-4 text-foreground hover:text-foreground"
                     >
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
               <Button variant="premium" as-child class="mr-3" size="defaultIcon">
                  <router-link to="#">
                     <SolidCarrot class="mr-2"/>
                     Upgreade to Golden Carrot
                  </router-link>
               </Button>
               <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                     <Button
                        variant="secondary"
                        size="icon"
                        class="rounded-full"
                     >
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
               <Button variant="ghost" size="icon" @click="toggleTheme">
                  <OutlineClearNight
                     :class="[
                        'absolute rotate-0 scale-100 transition-all',
                        { 'dark:-rotate-90 dark:scale-0': isDark },
                     ]"
                  />
                  <OutlineSunny
                     :class="[
                        'absolute rotate-90 scale-0 transition-all',
                        { 'dark:rotate-0 dark:scale-100': isDark },
                     ]"
                  />
                  <span class="sr-only">Toggle theme</span>
               </Button>
            </nav>
         </header>
         <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-y-auto bg-backgroundSecondary md:rounded-tl-2xl">
            <router-view />
         </main>
         <Footer class="max-w-full gap-4 p-4 lg:gap-6 lg:p-6 bg-backgroundSecondary justify-start [&>div]:max-w-full" />
      </main>
   </div>
</template>

<script setup>
import { CircleUser, Menu } from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
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
	OutlineCarrot,
	OutlineClearNight,
	OutlineCommand,
	OutlineGridThree,
	OutlineSunny,
	SolidCarrot,
	SolidCommand,
	SolidGridThree,
} from '@/components/ui/icons'

import Footer from '@/components/Footer.vue'
import { useAuth } from '@/utils/auth'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import { useColorMode } from '@vueuse/core'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Logo } from '@/components/ui/icons'

const route = useRoute()
const router = useRouter()

// Function to store guildID in localStorage
const saveGuildID = (guildID) => {
	localStorage.setItem('guildID', guildID)
}

// Retrieve guildID from route or localStorage
const guildID = ref(
	route.params.guildID || sessionStorage.getItem('guildID') || '',
)

const items = computed(() => [
	{
		path: `/manage/${guildID.value}`,
		title: 'Dashboard',
		iconSolid: SolidGridThree,
		iconOutline: OutlineGridThree,
	},
	{
		path: `/manage/${guildID.value}/commands`,
		title: 'Commands',
		iconSolid: SolidCommand,
		iconOutline: OutlineCommand,
	},
])

const currentRoute = computed(() => route.path)

const isActive = (path) => {
	return currentRoute.value.toLowerCase().endsWith(path.toLowerCase())
}

const handleNavigation = (path) => {
	router.push(path)
}

const { user, checkCallback, checkSessionStorage, logout } = useAuth()

const colorMode = useColorMode()
const isDark = ref(colorMode.value === 'dark')

const toggleTheme = () => {
	colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}

watch(colorMode, (newMode) => {
	isDark.value = newMode === 'dark'
})

onMounted(() => {
	if (guildID.value) {
		saveGuildID(guildID.value)
	}
})
</script>
