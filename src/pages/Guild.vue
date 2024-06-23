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

      <section
         class="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-3"
         v-if="!loading && !error && guild"
      >
         <Card class="not-prose">
            <CardHeader>
               <div class="flex justify-between mb-2">
                  <div class="flex size-14 bg-primary items-center justify-center rounded-xl">
                     <OutlineCarrot class="text-primary-foreground" />
                  </div>
                  <Button variant="premium" size="smIcon"><SolidCarrot class="mr-1" /> Premium</Button>
               </div>
               <CardTitle class="text-lg">
                  Server Info
               </CardTitle>
               <CardDescription>
                  {{ guild.description || 'No description available.' }}</CardDescription>
            </CardHeader>
            <CardContent>
               <article>
                  <section>
                     <p>
                        <strong>Member Count:</strong>
                        {{ guild.memberCount }}
                     </p>
                     <p><strong>Roles Count:</strong> {{ roles.length }}</p>
                     <!-- <Button>Copy server ID</Button> -->
                  </section>
               </article>
            </CardContent>
            <CardFooter>
               <Button variant="secondary">Copy server ID</Button>
            </CardFooter>
         </Card>
         <Card
            v-if="!loading && !error && guild"
            class="not-prose"
         >
            <CardHeader>
               <div class="flex justify-between mb-2">
                  <div class="flex size-14 bg-primary items-center justify-center rounded-xl">
                     <OutlineCarrot class="text-primary-foreground" />
                  </div>
                  <Button variant="premium" size="smIcon"><SolidCarrot class="mr-1" /> Premium</Button>
               </div>
               <CardTitle class="text-lg">
                  Channels Info
               </CardTitle>
               <CardDescription>
                  {{ guild.description || 'No description available.' }}</CardDescription>
            </CardHeader>
            <CardContent>
               <article>
                  <section>
                     <p>
                        <strong>Category Count:</strong>
                        {{ guild.categoryCount }}
                     </p>

                     <p>
                        <strong>Text Channel Count:</strong>
                        {{ guild.textChannelCount }}
                     </p>
                     <p>
                        <strong>Voice Channel Count:</strong>
                        {{ guild.voiceChannelCount }}
                     </p>
                  </section>
               </article>
            </CardContent>
         </Card>
         <Card
            v-if="!loading && !error && guild"
            class="not-prose"
         >
            <CardHeader>
               <div class="flex justify-between mb-2">
                  <div class="flex size-14 bg-primary items-center justify-center rounded-xl">
                     <OutlineCarrot class="text-primary-foreground" />
                  </div>
                  <Button variant="premium" size="smIcon"><SolidCarrot class="mr-1" /> Premium</Button>
               </div>
               <CardTitle class="text-lg">
                  Channels Info
               </CardTitle>
               <CardDescription>
                  {{ guild.description || 'No description available.' }}</CardDescription>
            </CardHeader>
            <CardContent>
               <article>
                  <section>
                     <p>
                        <strong>Category Count:</strong>
                        {{ guild.categoryCount }}
                     </p>

                     <p>
                        <strong>Text Channel Count:</strong>
                        {{ guild.textChannelCount }}
                     </p>
                     <p>
                        <strong>Voice Channel Count:</strong>
                        {{ guild.voiceChannelCount }}
                     </p>
                  </section>
               </article>
            </CardContent>
         </Card>
         <!-- <Card
            v-if="!loading && !error && guild"
            class="not-prose w-full"
         >
            <CardHeader>
               <CardTitle>Server Info</CardTitle>
            </CardHeader>
            <CardContent>
               <article>
                  <section>
                     <p>
                        <strong>Category Count:</strong>
                        {{ guild.categoryCount }}
                     </p>

                     <p>
                        <strong>Text Channel Count:</strong>
                        {{ guild.textChannelCount }}
                     </p>
                     <p>
                        <strong>Voice Channel Count:</strong>
                        {{ guild.voiceChannelCount }}
                     </p>
                  </section>
               </article>
            </CardContent>
         </Card> -->
      </section>

      <Select v-if="!loading && !error && roles.length > 0">
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
      </Select>
      <Dialog>
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

      <!-- <DialogFooter>
        Save changes
      </DialogFooter> -->
      <WelcomeFormEasy
         v-if="!loading && !error && guild"
         :serverId="guild.id"
         :channels="channels"
      />
    </DialogContent>
  </Dialog>
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
import OutlineCarrot from '@/assets/icons/OutlineCarrot.vue'
import SolidCarrot from '@/assets/icons/SolidCarrot.vue'

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

onMounted(async () => {
	checkSessionStorage()
	if (!isAuthenticated.value) {
		router.push('/')
		return
	}
})
</script>
