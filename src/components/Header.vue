<template>
  <header class="relative w-full bg-background border-b border-backgroundSecondary shadow-lg">
    <section class="flex items-center justify-between max-w-screen-xl px-6 mx-auto">
      <!-- Navigation for smaller screens -->
      <!-- Uncomment this section if needed -->
      <router-link to="/" class="mr-6 flex gap-3">
        <Logo size="32" />
        <h4 class="whitespace-nowrap text-xl font-bold flex items-center">Tiny Rabbit</h4>
      </router-link>
      <!-- Main Navigation Menu -->
      <ul class="flex items-center">
        <button @click="toggleMenu" class="flex items-center  max-lg:hidden">
          Plugins
          <OutlineChevronRight size="16" class="ml-2 rotate-90" />
        </button>
        <!-- Sub Navigation Menu -->

        <section class="bg-background w-screen absolute left-0 top-[calc(100%+1px)] z-20 shadow-lg" v-if="isMenuOpen">
          <nav class="mx-auto max-w-screen-xl grid grid-cols-5">
            <section class="w-full h-full col-span-3 pt-8 pb-9 pr-8 grid grid-cols-2 gap-8">
              <div v-for="(item, i) in dropdownItems" :key="i">
                  <h4 class="text-foreground text-sm">Category</h4>
                  <ul class="grid grid-cols-1 gap-6 mt-5 pl-2">
                    <li v-for="(subitem, j) in item.subitems" :key="j" >
                      <router-link v-if="!subitem.external" :to="subitem.path" class="block transition-colors text-sm text-foreground/40 hover:text-foreground/60">
                        <div class="flex gap-4">
                          <OutlineDiscord class="text-foreground"/>
                          <div class="flex flex-col">
                            <h4 class="text-foreground text-lg font-bold">title</h4>
                            {{ subitem.title }}
                          </div>
                        </div>
                      </router-link>
                      <a v-else :href="subitem.path" class="block text-sm text-foreground/30 hover:text-foreground/70" target="_blank">{{ subitem.title }}</a>
                    </li>
                  </ul>
                </div>
              </section>
              <div class="col-span-2 h-full w-full relative pt-8 pb-9 pl-8 pr-8 z-10">
                <p class="text-muted-foreground text-sm font-medium">Spotlight</p>
                <section class="grid grid-cols-1 gap-6 mt-5">
                  <ul class="flex flex-col space-y-4">
                    <router-link to="#" class="group">
                      <article class="flex gap-4">
                          <img src="../assets/hero.png" class="rounded-xl max-w-48" />
  
                        <div class="flex flex-col">
                          <div class="flex flex-1 flex-col">
                            <h4 class="text-lg font-bold line-clamp-1 text-ellipsis group-hover:text-white transition-colors duration-200">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
                            <p class="text-sm text-muted-foreground line-clamp-2 text-ellipsis group-hover:text-foreground/80 transition-colors duration-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi et deleniti non exercitationem ex similique inventore impedit est perspiciatis amet, aliquid, explicabo modi ut, illum quae vero quod ullam dolorem!</p>
                          </div>
                          <Button as-child variant="link" size="link" class="w-fit">
                            <router-link to="#">
                              Read article
                              <OutlineChevronRight size="16" class="ml-1 group-hover:translate-x-1 transition-all" />
                            </router-link>
                          </Button>
                        </div>
                      </article>
                    </router-link>
                    <router-link to="#">
                      <article class="flex gap-4 group">
                          <img src="../assets/hero.png" class="rounded-xl max-w-48" />
                        <div class="flex flex-col">
                          <div class="flex flex-1 flex-col">
                            <h4 class="text-lg font-bold line-clamp-1 text-ellipsis group-hover:text-white transition-colors duration-200">title</h4>
                            <p class="text-sm text-muted-foreground line-clamp-3 text-ellipsis group-hover:text-foreground/80 transition-colors duration-200">description</p>
                          </div>
                          <Button as-child variant="link" size="link" class="w-fit">
                            <router-link to="#">
                              Read article
                              <OutlineChevronRight size="16" class="ml-1 group-hover:translate-x-1 transition-all" />
                            </router-link>
                          </Button>
                        </div>
                      </article>
                    </router-link>
                  </ul>
                </section>
                <div class="absolute top-0 left-0 right-0 w-screen h-full bg-card-hover -z-10" />
              </div>
          </nav>
        </section>
      </ul>
      <!-- <NavigationMenu class="max-lg:hidden">
        <NavigationMenuList>
          <NavigationMenuItem v-for="(item, i) in items" :key="i">
            <router-link v-if="!item.external" :to="item.path" :class="cn(navigationMenuTriggerStyle(), 'rounded-full text-muted-foreground')">{{ item.title }}</router-link>
            <NavigationMenuLink v-else :href="item.path" :class="cn(navigationMenuTriggerStyle(), 'rounded-full text-muted-foreground')" target="_blank">{{ item.title }}</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> -->

      <!-- User Navigation -->
      <nav class="flex items-center space-x-3 ml-auto">
        <Button variant="premium" as-child  size="icon" class="lg:hidden">
          <router-link to="#">
            <OutlineCrown/>
          </router-link>
        </Button>
        <Button variant="premium" as-child  size="defaultIcon" class="max-lg:hidden">
          <router-link to="#">
            <OutlineCrown class="mr-2"/>
            Premium
          </router-link>
        </Button>
        <Sheet>
          <SheetTrigger as-child class="lg:hidden">
            <Button variant="ghost" size="icon">
              <OutlineMenu />
              <span class="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="flex flex-col">
            <SheetHeader class="items-start">
              <div class="flex-1">
                <router-link to="/" class="mr-4 flex gap-3">
                  <Logo size="32" />
                  <h4 class="whitespace-nowrap text-xl font-bold flex items-center">Tiny Rabbit</h4>
                </router-link>
              </div>
              <SheetClose>
                <Button variant="ghost" size="icon">
                  <OutlineClose />
                  <span class="sr-only">Close</span>
                </Button>
              </SheetClose>
            </SheetHeader>
            <nav class="my-4 flex-grow">
              <ul class="space-y-2">
                <li v-for="(item, i) in items" :key="i" @click="handleNavigation(item.path)" class="group hover:cursor-pointer rounded-full">
                  <SheetClose as-child>
                    <Button as-child variant="ghost" size="defaultIcon" class="justify-start">
                      <router-link :to="item.path" v-if="!item.external" class="flex items-center">{{ item.title }}</router-link>
                      <a v-else :href="item.path" :class="navigationMenuTriggerStyle()" target="_blank">{{ item.title }}</a>
                    </Button>
                  </SheetClose>
                </li>
              </ul>
            </nav>
            <SheetFooter class="mt-auto">
              <Button as-child size="defaultIcon" v-if="!user">
                <a href="https://api.rabbittale.co/login">
                  <SolidDiscord class="mr-2" />
                  Login with Discord
                </a>
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <Button as-child size="defaultIcon" v-if="!user" class="max-lg:hidden">
          <a href="https://api.rabbittale.co/login">
            <SolidDiscord class="mr-2" />
            Login with Discord
          </a>
        </Button>
        <Popover v-if="user">
          <PopoverTrigger class="h-10 flex items-center gap-2">
            <Avatar class="mr-2">
              <AvatarImage :src="user.avatarUrl" :alt="user.username" />
              <AvatarFallback>{{ avatarFallbackText }}</AvatarFallback>
            </Avatar>
            <span class="max-lg:hidden">{{ user.globalName }}</span>
            <OutlineChevronRight size="16" class="rotate-90 transition-transform" />
          </PopoverTrigger>
          <PopoverContent sideOffset="1" align="end" class="w-52 p-2 rounded-xl space-y-2">
            <section>
              <h4 class="ml-3 text-xs text-foreground font-bold uppercase py-3">Tiny Rabbit</h4>
              <Button as-child size="default" variant="ghost" class="w-full justify-start">
                <router-link to="/dashboard">My Servers</router-link>
              </Button>
            </section>
            <Separator />
            <Button as-child size="default" variant="ghost" @click="logout" class="w-full justify-start rounded-md">
              <router-link to="/"> Logout </router-link>
            </Button>
          </PopoverContent>
        </Popover>

        <!-- <Button variant="ghost" size="icon" @click="toggleTheme" class="rounded-full">
          <OutlineClearNight :class="['absolute rotate-0 scale-100 transition-all', { 'dark:-rotate-90 dark:scale-0': isDark }]" />
          <OutlineSunny :class="['absolute rotate-90 scale-0 transition-all', { 'dark:rotate-0 dark:scale-100': isDark }]" />
          <span class="sr-only">Toggle theme</span>
        </Button> -->
      </nav>
    </section>
  </header>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useColorMode } from '@vueuse/core'
import {
	SolidHome,
	OutlineSunny,
	OutlineClearNight,
	SolidDiscord,
	OutlineHome,
	OutlineChevronRight,
	OutlineDiscord,
	SolidCarrot,
	OutlineCarrot,
	OutlineCrown,
	OutlineMenu,
	OutlineClose,
} from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import Separator from '@/components/ui/separator/Separator.vue'
import { useAuth } from '@/utils/auth'
import { useRouter } from 'vue-router'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/icons'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from './ui/dropdown-menu'
import { AspectRatio } from './ui/aspect-ratio'

const items = [
	{
		path: '/bot',
		title: 'Tiny Rabbit',
		iconSolid: SolidHome,
		iconOutline: OutlineHome,
	},
	{
		path: '/dashbaord',
		title: 'My Servers',
		iconSolid: SolidHome,
		iconOutline: OutlineHome,
	},
	{
		path: 'https://discord.gg/dbHCceKAbc',
		title: 'Join Our Discord',
		iconSolid: SolidHome,
		iconOutline: OutlineHome,
		external: true,
	},
	// {
	// 	path: '/help',
	// 	title: 'Help',
	// 	iconSolid: SolidHome,
	// 	iconOutline: OutlineHome,
	// },
	// {
	// 	path: '/status',
	// 	title: 'Status',
	// 	iconSolid: SolidHome,
	// 	iconOutline: OutlineHome,
	// },
]

const dropdownItems = [
	{
		title: 'Moderation & Server Management',
		subitems: [
			{ path: '/welcome-plugin', title: 'Welcome Plugin', external: false },
			{ path: '/custom-commands', title: 'Custom Commands', external: false },
			{ path: '/reaction-roles', title: 'Reaction Roles', external: false },
			{ path: '/moderator', title: 'Moderator', external: false },
		],
	},
	{
		title: 'Utilities',
		subitems: [
			{ path: '/embeds', title: 'Embeds', external: false },
			{ path: '/search-anything', title: 'Search Anything', external: false },
			{ path: '/record', title: 'Record', external: false },
		],
	},
]

const { user, checkCallback, checkSessionStorage, logout } = useAuth()
const router = useRouter()

onMounted(() => {
	checkCallback()
	checkSessionStorage()
})

const colorMode = useColorMode()
const isDark = ref(colorMode.value === 'dark')

const toggleTheme = () => {
	colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}

watch(colorMode, (newMode) => {
	isDark.value = newMode === 'dark'
})

const avatarFallbackText = computed(() => {
	return user?.value?.username.slice(0, 2)
})

const isMenuOpen = ref(false)

const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value
}

const handleNavigation = (path) => {
	if (path.startsWith('http')) {
		window.open(path, '_blank')
	} else {
		router.push(path)
	}
}
</script>
