<script setup>
import { OutlineDiscord } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { onMounted, ref, computed, onUnmounted, watch } from 'vue'
import { cn } from '@/lib/utils'
import { fetchBotStatusData } from '@/api/botStatus'

const status = ref('online')
const version = ref('NaN')
const timer = ref(0)

const checkBotStatus = async () => {
	try {
		const result = await fetchBotStatusData()
		status.value = result.status
		version.value = result.version
		//TODO: upgrade to fetch all services status data
	} catch (err) {
		console.error(err)
		// Handle the case where fetching bot status fails
		status.value = 'offline'
		version.value = 'unknown'
	}
}

watch(timer, () => {
	checkBotStatus()
})

onMounted(() => {
	// Fetch the status immediately when the component is mounted
	checkBotStatus()

	// Set up the interval to update the timer every 15 seconds
	const intervalId = setInterval(() => {
		timer.value++
	}, 15000)

	// Clear the interval when the component is unmounted
	onUnmounted(() => {
		clearInterval(intervalId)
	})
})

const statusIndicator = computed(() =>
	status.value === 'online' ? 'bg-primary' : 'bg-destructive',
)
const statusLink = computed(() =>
	status.value === 'online' ? 'text-primary' : 'text-destructive',
)
const statusText = computed(() =>
	status.value === 'online' ? 'Rabbit Still Jumping' : 'Rabbit stopped jumping',
)
</script>

<template>
   <footer
      class="max-w-screen-lg mx-auto w-full space-y-2 lg:space-x-2 flex flex-col lg:flex-row items-start justify-between"
   >
      <section
         class="order-2 lg:order-none flex flex-col justify-between w-full lg:w-auto"
      >
         <div
            class="text-muted-foreground text-sm mt-4 leading-7 [&:not(:first-child)]:mt-6"
         >
            <router-link to="/">
               <img
                  src="../assets/rabbit_tale_logo.svg"
                  alt="Tiny Rabbit Bot Logo"
                  class="size-12 mb-10 mix-blend-difference"
               />
            </router-link>
            <p>
               Tiny Rabbit 🐇
               <a href="#bot-change-log">
                  <Badge variant="secondary"> {{ version }} </Badge>
               </a>
               <Button
                  as-child
                  variant="link"
                  size="link"
               >
                  <span :class="cn('size-2', 'mx-2', statusIndicator)" />
                  <a
                     :class="cn(statusLink, 'hover:underline')"
                     href="#"
                  >
                     {{ statusText }}
                  </a>
               </Button>
            </p>
            <p>
               &copy; {{ new Date().getFullYear() }} - Rabbit Tale Studios. All
               rights reserved.
            </p>
         </div>
      </section>
      <section
         class="order-none lg:order-2 flex md:flex-row flex-col justify-between text-muted-foreground text-sm mt-4 w-full lg:w-auto space-y-4 lg:space-y-0 lg:space-x-8"
      >
         <div>
            <h4
               class="scroll-m-20 text-base font-semibold tracking-tight uppercase"
            >
               Tiny Rabbit 🐇
            </h4>
            <ul class="[&>li]:mt-2">
               <li>
                  <Button
                     as-child
                     variant="link"
                     size="link"
                  >
                     <a href="#">Tiny Rabbit Bot</a>
                  </Button>
               </li>
               <li>
                  <Button
                     as-child
                     variant="link"
                     size="link"
                  >
                     <a href="#">Public Servers</a>
                  </Button>
               </li>
               <li>
                  <Button
                     as-child
                     variant="link"
                     size="link"
                  >
                     <a href="#">Bot Commands</a>
                  </Button>
               </li>
               <li>
                  <Button
                     as-child
                     variant="link"
                     size="link"
                  >
                     <a href="#">Help</a>
                  </Button>
               </li>
               <li>
                  <Button
                     as-child
                     variant="link"
                     size="link"
                  >
                     <a href="#">Get Premium</a>
                  </Button>
               </li>
               <li>
                  <Button
                     as-child
                     variant="link"
                     size="link"
                  >
                     <a href="#">Tiny Rabbit Discord Server</a>
                  </Button>
               </li>
            </ul>
         </div>
         <div>
            <h4
               class="scroll-m-20 text-base font-semibold tracking-tight uppercase"
            >
               Legal
            </h4>
            <ul class="[&>li]:mt-2">
               <li>
                  <Button
                     as-child
                     variant="link"
                     size="link"
                  >
                     <a href="#">Terms of Service</a>
                  </Button>
               </li>
               <li>
                  <Button
                     as-child
                     variant="link"
                     size="link"
                  >
                     <a href="#">Privacy Policy</a>
                  </Button>
               </li>
               <li>
                  <Button
                     as-child
                     variant="link"
                     size="link"
                  >
                     <a href="#">Cookie Policy</a>
                  </Button>
               </li>
            </ul>
         </div>
         <div>
            <h4
               class="scroll-m-20 text-base font-semibold tracking-tight uppercase"
            >
               Contact
            </h4>
            <p>
               Email:
               <Button
                  as-child
                  variant="link"
                  size="link"
               >
                  <a href="mailto:kris@rabbittale.co">kris@rabbittale.co</a>
               </Button>
            </p>
            <div class="flex space-x-2">
               <Button
                  as-child
                  variant="secondary"
                  size="icon"
                  class="justify-center rounded-full mt-2"
               >
                  <a
                     href="https://discord.gg/dbHCceKAbc"
                     target="_blank"
                  >
                     <OutlineDiscord />
                  </a>
               </Button>
               <Button
                  as-child
                  variant="secondary"
                  size="icon"
                  class="justify-center rounded-full mt-2"
               >
                  <a
                     href="https://discord.gg/dbHCceKAbc"
                     target="_blank"
                  >
                     <OutlineDiscord />
                  </a>
               </Button>
            </div>
         </div>
      </section>
   </footer>
</template>
