<script setup>
import { OutlineDiscord } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { onMounted, ref, computed, onUnmounted, watch, watchEffect } from 'vue'
import { cn } from '@/lib/utils'
import { fetchBotStatusData, useBotStatus } from '@/api/botStatus'
import { Logo } from '@/components/ui/icons'

const { data: botStatusData, error, isValidating } = useBotStatus()

const status = computed(() => botStatusData?.value?.status ?? 'offline')
const version = computed(() => botStatusData?.value?.version ?? 'unknown')

const statusIndicator = computed(() => status.value === 'online' ? 'bg-primary' : 'bg-destructive')
const statusLink = computed(() => status.value === 'online' ? 'text-primary' : 'text-destructive')
const statusText = computed(() => status.value === 'online' ? 'Rabbit Still Jumping' : 'Rabbit stopped jumping')
const rabbitClass = computed(() => status.value === 'online' ? 'inline-block animate-bounce mr-2' : '')

const tinyRabbitLinks = [
  { text: 'Tiny Rabbit', href: '#' },
  { text: 'Public Servers', href: '#' },
  { text: 'Plugins', href: '#' },
  { text: 'Help', href: '#' },
  { text: 'Golden Carrot', href: 'premium' },
  { text: 'Tiny Rabbit Discord Server', href: '#' }
]

const legalLinks = [
  { text: 'Terms of Service', href: 'tos' },
  { text: 'Privacy Policy', href: '#' },
  { text: 'Cookie Policy', href: '#' }
]

const contactInfo = {
  email: 'kris@rabbittale.co',
  discordLink: 'https://discord.gg/dbHCceKAbc'
}
</script>

<template>
  <footer class="w-full flex justify-center">
    <div class="max-w-screen-xl w-full px-6 space-y-2 lg:space-x-2 flex flex-col lg:flex-row items-start justify-between">
      <section class="order-2 lg:order-none flex flex-col justify-between w-full lg:w-auto">
        <div class="text-muted-foreground text-sm mt-4 leading-7 [&:not(:first-child)]:mt-6">
          <router-link to="/" class="inline-flex size-12 text-foreground">
            <Logo class="mb-4" size="48" />
          </router-link>
          <p>
            Tiny Rabbit <span :class="rabbitClass">🐇</span>
            <a href="#bot-change-log">
              <Badge variant="secondary"> {{ version }} </Badge>
            </a>
            <Button as-child variant="link" size="link" class="relative">
              <div class="relative inline-flex">
                <div :class="cn('size-2 mx-2 rounded-full', statusIndicator)" />
                <div :class="cn('size-2 mx-2 rounded-full absolute top-0 left-0 animate-ping', statusIndicator)" />
                <div :class="cn('size-2 mx-2 rounded-full absolute top-0 left-0 animate-pulse', statusIndicator)" />
              </div>
              <a :class="cn(statusLink, 'hover:underline')" href="#">
                {{ statusText }}
              </a>
            </Button>
          </p>
          <p>&copy; {{ new Date().getFullYear() }} - Rabbit Tale Studios. All rights reserved.</p>
        </div>
      </section>
      <nav class="order-none lg:order-2 flex md:flex-row flex-col justify-between text-muted-foreground text-sm mt-4 w-full lg:w-auto space-y-4 lg:space-y-0 lg:space-x-8">
        <div>
          <h4 class="mb-6 text-white text-sm uppercase">Tiny Rabbit 🐇</h4>
          <ul class="[&>li]:mt-2">
            <li v-for="link in tinyRabbitLinks" :key="link.text">
              <Button as-child variant="link" size="link">
                <a :href="link.href">{{ link.text }}</a>
              </Button>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="mb-6 text-white text-sm uppercase">Legal</h4>
          <ul class="[&>li]:mt-2">
            <li v-for="link in legalLinks" :key="link.text">
              <Button as-child variant="link" size="link">
                <a :href="link.href">{{ link.text }}</a>
              </Button>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="mb-6 text-white text-sm uppercase">Contact</h4>
          <address>
            Email:
            <Button as-child variant="link" size="link">
              <a :href="`mailto:${contactInfo.email}`">{{ contactInfo.email }}</a>
            </Button>
          </address>
          <div class="flex space-x-2">
            <Button as-child variant="secondary" size="icon" class="justify-center rounded-full mt-2">
              <a :href="contactInfo.discordLink" target="_blank">
                <OutlineDiscord />
              </a>
            </Button>
            <Button as-child variant="secondary" size="icon" class="justify-center rounded-full mt-2">
              <a :href="contactInfo.discordLink" target="_blank">
                <OutlineDiscord />
              </a>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  </footer>
</template>
