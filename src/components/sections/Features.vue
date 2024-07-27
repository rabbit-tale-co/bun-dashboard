<template>
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-7 lg:gap-16">
    <div :class="
      cn('col-span-4 mx-auto lg:ml-0 lg:mr-auto', {
        'order-first lg:order-last lg:mr-0 lg:ml-auto': props.reverse
      })"
    >
      <img :src="imageSrc" class="w-full max-w-[560px] rounded-2xl" :alt=title>
    </div>
    <div :class="
      cn('col-span-4 lg:col-span-3 flex flex-col justify-center items-start text-center lg:text-left', {
        'lg:order-first': props.reverse
      })"
    >
      <h2 class="text-white mx-auto lg:mx-0 font-bold text-[35px] leading-[42px]">
        {{ title }}
      </h2>
      <p class="text-muted-foreground text-base my-8 whitespace-pre-line">{{ description }}</p>
      <div class="w-full flex-col lg:flex-row flex items-center justify-start gap-4">
        <Button v-if="primaryButton" as-child size="lg" class="max-lg:w-full">
          <template v-if="primaryButtonExternal">
            <a :href="primaryButtonLink" target="_blank">
              {{ primaryButtonText }}
            </a>
          </template>
          <template v-else>
            <router-link :to="primaryButtonLink">
              {{ primaryButtonText }}
            </router-link>
          </template>
        </Button>
        <Button v-if="secondaryButton" as-child variant="secondary" size="lg" class="max-lg:w-full">
          <router-link :to="secondaryButtonLink">
            {{ secondaryButtonText }}
          </router-link>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const props = defineProps({
	imageSrc: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	primaryButton: { type: Boolean, required: false, default: true },
	primaryButtonText: { type: String, required: true },
	primaryButtonLink: { type: String, required: true },
	primaryButtonExternal: { type: Boolean, required: false, default: false },
	secondaryButton: { type: Boolean, required: false, default: false },
	secondaryButtonText: { type: String, required: true },
	secondaryButtonLink: { type: String, required: true },
	reverse: { type: Boolean, required: false, default: false },
})
</script>
