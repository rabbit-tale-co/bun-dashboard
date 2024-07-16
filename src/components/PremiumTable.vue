<template>
   <section class="flex flex-col w-full max-w-screen-xl mt-10 gap-20 mx-auto px-10">
     <Table class="w-full max-w-screen-lg mx-auto">
       <TableHeader class="border-b border-muted-foreground/10 h-20">
         <TableRow>
           <TableHead class="text-left font-bold text-2xl text-white px-0">Plans Comparison</TableHead>
           <TableHead class="text-center font-bold text-2xl text-white">Free</TableHead>
           <TableHead class="text-center font-bold text-2xl text-white bg-background rounded-t-2xl">Golden Carrot</TableHead>
         </TableRow>
       </TableHeader>
       <template v-for="(category, catIndex) in categories" :key="catIndex">
         <TableHeader class="h-20">
           <TableRow>
             <TableHead class="text-left text-lg text-white px-0">{{ category.name }}</TableHead>
             <TableHead class="text-center text-white" />
             <TableHead class="text-center text-white bg-background" />
           </TableRow>
         </TableHeader>
         <TableBody>
           <TableRow
            v-for="(benefit, index) in category.benefits"
            :key="index"
            :class="[
              index % 2 === 1 && 'bg-[#2B2D38]'
            ]
           ">
             <TableCell class="text-muted-foreground items-center">{{ benefit.name }}</TableCell>
             <TableCell class="text-center items-center w-52">
               <template v-if="benefit.free !== true && benefit.free !== false">
                 <span :class="{'text-white': benefit.free > 0, 'text-destructive-foreground': benefit.free == 0}" v-html="benefit.free" />
               </template>
               <OutlineCheck v-else-if="benefit.free === true" class="mx-auto" />
               <OutlineClose v-else class="text-destructive-foreground mx-auto" />
             </TableCell>
             <TableCell :class="
               [
                  'text-center items-center bg-background w-52',
                  index % 2 === 1 && 'bg-background/80'
               ]">
               <template v-if="benefit.premium !== true && benefit.premium !== false">
                 <span class="text-premium" v-html="benefit.premium"></span>
               </template>
               <OutlineCheck v-else-if="benefit.premium === true" class="text-premium mx-auto" />
               <OutlineClose v-else class="text-premium mx-auto" />
             </TableCell>
           </TableRow>
         </TableBody>
       </template>
       <TableFooter>
         <TableRow>
           <TableCell class="text-left text-white" />
           <TableCell class="text-center text-white">
             <Button size="lg" disabled variant="ghost" class="w-full">Current Plan</Button>
           </TableCell>
           <TableCell class="text-center text-white bg-background rounded-b-2xl">
             <Button size="lg" variant="premium" class="w-full">Choose Plan</Button>
           </TableCell>
         </TableRow>
       </TableFooter>
     </Table>
   </section>
 </template>
 
 <script setup>
 import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableFooter,
   TableHead,
   TableHeader,
   TableRow,
 } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { OutlineCheck, OutlineClose } from './ui/icons'

const categories = [
  {
    name: 'Server management',
    benefits: [
      // { name: 'Automations', free: false, premium: 50 },
      // { name: 'Custom commands', free: false, premium: 500 },
      { name: 'Moderation', free: false, premium: true },
      { name: 'Reaction Role', free: 5, premium: 40 },
      { name: 'Maximum embeds on a ticketing panel message', free: 0, premium: 10 },
      { name: 'Maximum embeds on a ticket introduction message', free: 0, premium: 10 },
      { name: 'Enable transcripts of deleted tickets', free: false, premium: true },
      { name: 'Welcome & Goodbye messages', free: true, premium: true },
      { name: 'Invite tracker', free: false, premium: true },
    ],
  },
  {
    name: 'Utilities',
    benefits: [
      { name: 'Embed messages', free: false, premium: 500 },
      { name: 'Recording', free: '<span class="text-white/50">max.</span> 2 minutes', premium: true },
      { name: 'Search anything command', free: true, premium: true },
      { name: 'Temporary channels', free: 1, premium: 100 }
    ],
  },
  {
   name: 'Engagement & Fun',
   benefits: [
     { name: 'Birthday messages', free: false, premium: true },
     { name: 'XP and Levels', free: true, premium: true },
   ],
  }
]

</script>
