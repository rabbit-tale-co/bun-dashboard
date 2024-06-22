<script setup>
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
</script>

<template>
   <article
      class="prose max-w-prose mx-auto dark:prose-invert prose-headings:font-semibold prose-img:rounded-3xl"
   >
      <header>
         <img
            src="../assets/hero.png"
            alt="Tiny Rabbit Bot Logo"
            class="mx-auto"
         />
         <h1>Welcome to Tiny Rabbit Bot Dashboard</h1>
         <h2>
            Your Ultimate Solution for Managing Discord Servers Efficiently
         </h2>
         <p>
            Tiny Rabbit Bot is a powerful and versatile Discord bot designed to
            simplify the management of your Discord server. Whether you are
            running a small community or a large public server, Tiny Rabbit Bot
            offers a suite of features that streamline moderation, enhance user
            engagement, and provide detailed insights.
         </p>
         <div class="flex space-x-4 not-prose">
            <Button
               as-child
               size="lg"
               class="rounded-full"
            >
               <a
                  href="https://discord.com/oauth2/authorize?client_id=1207315441614331904&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Fapi.rabbittale.co%2Fcallback&integration_type=0&scope=bot+identify+guilds+email+guilds.members.read+messages.read"
                  target="_blank"
               >
                  Add To Server
               </a>
            </Button>
            <Button
               as-child
               variant="secondary"
               size="lg"
               class="rounded-full"
            >
               <a
                  class="no-underline"
                  href="https://discord.gg/dbHCceKAbc"
                  target="_blank"
               >
                  Join Our Discord
               </a>
            </Button>
         </div>
      </header>

      <section>
         <h2>Key Features</h2>
         <h3>Automated Moderation</h3>
         <p>
            Keep your server safe and friendly with automated moderation tools.
            Tiny Rabbit Bot can automatically mute, kick, or ban users who
            violate server rules, detect and filter out inappropriate language
            or spam, and monitor server activity to generate moderation logs for
            administrators.
         </p>
         <ul>
            <li>
               Automatically mute, kick, or ban users who violate server rules.
               <Badge variant="secondary">Soon</Badge>
            </li>
            <li>
               Detect and filter out inappropriate language or spam.
               <Badge variant="secondary">Soon</Badge>
            </li>
            <li>
               Monitor server activity and generate moderation logs for
               administrators.
               <Badge variant="secondary">Soon</Badge>
            </li>
         </ul>
         <h3>Customizable Commands</h3>
         <p>
            Create custom commands to streamline server management and enhance
            user engagement. Tiny Rabbit Bot allows you to define custom
            commands that can be triggered by users, providing quick access to
            information, resources, or fun interactions.
         </p>
         <ul>
            <li>
               Create custom commands for specific server functions.
               <Badge variant="secondary">Soon</Badge>
            </li>
            <li>
               Use built-in commands to manage roles, channels, and server
               settings.
            </li>
            <li>
               Schedule commands to run automatically at specified times.
               <Badge variant="secondary">Soon</Badge>
            </li>
         </ul>
      </section>

      <section>
         <h2>Why Choose Tiny Rabbit Bot?</h2>
         <h3>Easy to Use</h3>
         <p>
            Tiny Rabbit Bot is designed with user-friendliness in mind. Its
            intuitive dashboard makes it easy to configure and manage, even for
            those with little technical experience.
         </p>
         <h3>Reliable and Secure</h3>
         <p>
            With a robust infrastructure and advanced security measures, Tiny
            Rabbit Bot ensures that your server data is protected and your bot
            is always online and responsive.
         </p>
         <h3>Community Support</h3>
         <p>
            Join our Discord community to connect with other server owners,
            share tips and tricks, and get help with any questions or issues you
            may have.
         </p>
      </section>
   </article>
</template>
