<template>
  <header class="max-w-screen-lg mx-auto w-full">
    <section class="flex items-center justify-between">
      <!-- Navigation for smaller screens -->
      <!-- Uncomment this section if needed -->
      
      <Sheet>
        <SheetTrigger as-child class="lg:hidden">
          <Button variant="ghost" size="icon">
            <OutlineHome />
            <span class="sr-only">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription>Navigate through the sections</SheetDescription>
          </SheetHeader>
          <nav class="my-4">
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
        </SheetContent>
      </Sheet>

      <router-link to="/">
        <Logo class="mix-blend-difference" size="40" />
        </router-link>
      <!-- Main Navigation Menu -->
      <NavigationMenu class="max-lg:hidden">
        <NavigationMenuList>
          <NavigationMenuItem v-for="(item, i) in items" :key="i">
            <router-link v-if="!item.external" :to="item.path" :class="cn(navigationMenuTriggerStyle(), 'rounded-full')">{{ item.title }}</router-link>
            <NavigationMenuLink v-else :href="item.path" :class="cn(navigationMenuTriggerStyle(), 'rounded-full')" target="_blank">{{ item.title }}</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <!-- User Navigation -->
      <nav class="flex items-center space-x-3 ml-auto">
        <Button as-child size="defaultIcon" v-if="!user">
          <a href="https://api.rabbittale.co/login">
            <SolidDiscord class="mr-2" />
            Login with Discord
          </a>
        </Button>

        <Button as-child v-if="user" class="rounded-full">
          <router-link to="/account"> Manage Servers </router-link>
        </Button>

        <Popover v-if="user">
          <PopoverTrigger class="h-10">
            <Avatar>
              <AvatarImage :src="user.avatarUrl" :alt="user.username" />
              <AvatarFallback>{{ avatarFallbackText }}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent align="end" class="w-52 p-2 rounded-xl space-y-2">
            <Button as-child size="default" variant="ghost" class="w-full justify-start rounded-md">
              <router-link to="/account"> Account </router-link>
            </Button>
            <Separator />
            <Button as-child size="default" variant="ghost" @click="logout" class="w-full justify-start rounded-md">
              <router-link to="/"> Logout </router-link>
            </Button>
          </PopoverContent>
        </Popover>

        <Button variant="ghost" size="icon" @click="toggleTheme" class="rounded-full">
          <OutlineClearNight :class="['absolute rotate-0 scale-100 transition-all', { 'dark:-rotate-90 dark:scale-0': isDark }]" />
          <OutlineSunny :class="['absolute rotate-90 scale-0 transition-all', { 'dark:rotate-0 dark:scale-100': isDark }]" />
          <span class="sr-only">Toggle theme</span>
        </Button>
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
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import Separator from '@/components/ui/separator/Separator.vue'
import { useAuth } from '@/utils/auth'
import { useRouter } from 'vue-router'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/icons'

const items = [
	{
		path: '/bot',
		title: 'Tiny Rabbit Bot',
		iconSolid: SolidHome,
		iconOutline: OutlineHome,
	},
	{
		path: '/public-servers',
		title: 'Public Servers',
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
	{
		path: '/help',
		title: 'Help',
		iconSolid: SolidHome,
		iconOutline: OutlineHome,
	},
	{
		path: '/status',
		title: 'Status',
		iconSolid: SolidHome,
		iconOutline: OutlineHome,
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

const handleNavigation = (path) => {
	if (path.startsWith('http')) {
		window.open(path, '_blank')
	} else {
		router.push(path)
	}
}
</script>
