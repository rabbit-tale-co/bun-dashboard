<template>
  <a
    v-if="isCommunity"
    :href="link"
    class="hover:opacity-80 transition-opacity"
    target="_blank"
  >
    <div class="bg-card-hover rounded-lg px-6 py-5 flex items-center justify-start h-24">
      <img :src="imageSrc" class="size-12 rounded-lg" :alt="serverName">
      <div class="ml-4 text-left text-base">
        <div class="flex items-start justify-start text-white">
          <p class="font-bold line-clamp-2">{{ serverName }}</p>
        </div>
        <div class="flex items-center justify-start text-muted-foreground">
          <OutlineUserGroup size="16" class="mr-2" />
          <p class="text-base">{{ memberCount }}</p>
        </div>
      </div>
    </div>
  </a>
  <div
    v-else
    class="bg-card-hover rounded-lg px-6 py-5 flex items-center justify-start h-24 cursor-not-allowed opacity-50"
    @click="handleClick"
  >
    <img :src="imageSrc" class="size-12 rounded-lg" :alt="serverName">
    <div class="ml-4 text-left text-base">
      <div class="flex items-start justify-start text-white">
        <p class="font-bold line-clamp-2">{{ serverName }}</p>
      </div>
      <div class="flex items-center justify-start text-muted-foreground">
        <OutlineUserGroup size="16" class="mr-2" />
        <p class="text-base">{{ memberCount }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { OutlineUserGroup } from '../ui/icons'
import { toast } from 'vue-sonner'

const props = defineProps({
  link: { type: String, required: true },
  imageSrc: { type: String, required: true },
  serverName: { type: String, required: true },
  memberCount: { type: String, required: true },
  isCommunity: { type: Boolean, required: true },
})

function handleClick() {
  if (!props.isCommunity) {
    toast.error('This server is private.')
  }
}
</script>
