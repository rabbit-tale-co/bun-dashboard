<template>
   <section
      class="prose max-w-full dark:prose-invert prose-p:my-2 prose-headings:font-semibold prose-img:rounded-3xl space-y-6"
   >
      <!-- <h1>Server Info</h1> -->
      <p v-if="loading">Loading...</p>
      <p v-if="error">{{ error }}</p>
      <header
         v-if="!loading && !error && guild"
         class="flex items-start space-x-4"
      >
         <img
            v-if="guild.icon"
            :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=4096`"
            :alt="guild.name"
            class="size-14 rounded-full not-prose"
         />
         <div>
            <h3 class="my-0">{{ guild.name }}</h3>
            <p class="!my-0 leading-tight">
               {{ guild.description || 'No description avainable.' }}
            </p>
         </div>
      </header>

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
            <!-- <CardFooter>
               <Button variant="secondary">Copy server ID</Button>
            </CardFooter> -->
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
                  <!-- <Button variant="secondary">Copy server ID</Button> -->
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

      <h2 v-if="!loading && !error && guild">Plugins</h2>
      <article
         class="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4"
         v-if="!loading && !error && guild"
      >
         <router-link to="#" v-for="(plugin, index) in plugins" class="not-prose"
         :key="index">
            <Card
               class="flex flex-col h-full dark:hover:bg-card-hover hover:bg-card-hover/30"
            >
               <CardHeader class="flex-grow">
                  <div class="flex justify-between mb-2">
                     <div class="flex size-14 bg-primary items-center justify-center rounded-xl">
                        <SolidCarrot size="32" class="text-primary-foreground" />
                     </div>
                     <Button
                        v-if="plugin.premium"
                        variant="premium"
                        size="smIcon"
                     >
                        <SolidCarrot class="mr-1" /> Premium
                     </Button>
                  </div>
                  <CardTitle class="text-lg">{{ plugin.title }}</CardTitle>
                  <CardDescription>{{ plugin.description }}</CardDescription>
               </CardHeader>
               <CardFooter>
                  <Button
                     v-if="plugin.active"
                     variant="accent"
                     size="defaultIcon"
                  >
                     <OutlineCheckCrFr class="mr-2" />
                     Active
                  </Button>
                  <Button
                     v-else
                     variant="secondary"
                  >
                  <OutlinePlus class="mr-2" />
                     Enable
                  </Button>
               </CardFooter>
            </Card>
         </router-link>
      </article>

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
   </section>
</template>

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
import { useAuth } from '@/utils/auth'
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
import { OutlineCarrot, OutlineCheckCrFr, OutlinePlus, SolidCarrot, SolidMicrochip } from '@/components/ui/icons'
import { toast } from 'vue-sonner'
import { plugins } from '@/lib/plugins'

const router = useRouter()

const { isAuthenticated, checkSessionStorage } = useAuth()
const { guild, roles, channels, loading, error } = useGuildData()

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
      error: 'Failed to copy server ID.'
   })
}

onMounted(async () => {
	checkSessionStorage()
	if (!isAuthenticated.value) {
		router.push('/')
		return
	}
})
</script>
