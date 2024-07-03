<template>
   <section class="w-full relative z-10 lg:min-h-[calc(100vh-20%)] flex">
      <!-- <div class="absolute w-full h-full -z-10 bottom-0 left-0 pointer-events-none overflow-hidden">
         <img src="@/assets/hero.png" alt="Tiny Rabbit Bot Logo" class="w-full absolute bottom-0" />
      </div> -->
      <div class="h-full w-full flex items-center justify-start">
         <div class="lg:mx-auto w-full max-w-screen-xl p-6 lg:px-10 pt-10 lg:pt-24 lg:py-36">
            <div class="w-full text-center md:w-3/5 md:mx-auto lg:mx-0 lg:text-left lg:w-2/5">
               <h1 class="text-white font-bold text-5xl leading-tight">
               The best <br>
               all-in-one bot <br>
               for Discord
               </h1>
               <p class="text-muted-foreground text-base mt-7 mb-10 whitespace-pre-line">
               Tiny Rabbit is a new growing Discord bot, easy-to-use, that Discord servers worldwide trust to manage, entertain, and grow their community.
               </p>
               <div class="flex flex-col md:flex-row justify-center lg:justify-start items-stretch gap-4 lg:max-w-none m-auto">
               <Button as-child size="lgIcon">
                  <a href="https://discord.com/oauth2/authorize?client_id=1207315441614331904&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Fapi.rabbittale.co%2Fcallback&integration_type=0&scope=bot+identify+guilds+email+guilds.members.read+messages.read" target="_blank">
                     <SolidDiscord class="mr-2" />
                     Add To Discord
                  </a>
               </Button>
               <Button as-child variant="secondary" size="lg">
                  <router-link to="#/features">
                     See features
                  </router-link>
               </Button>
               </div>
            </div>
            <div class="h-full lg:w-1/2 md:translate-x-16 translate-y-4 lg:translate-y-0 lg:translate-x-0 lg:absolute lg:right-40 -scale-x-[1] bottom-[16.5rem] flex items-end justify-start pointer-events-none -z-10">
               <img src="@/assets/rabbit_tale_logo.svg" alt="Rabbit Tale Logo">
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { SolidDiscord } from '@/components/ui/icons';
</script>