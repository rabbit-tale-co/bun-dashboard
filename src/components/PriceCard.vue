<template>
   <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
       <div
         v-for="plan in plans"
         :key="plan.name"
         :class="[
           'w-full md:max-w-[380px] min-w-80 rounded-lg p-5 bg-background text-left relative overflow-hidden flex flex-col justify-start',
           plan.highlight ? 'ring-1 ring-premium ring-offset-premium shadow-premium' : 'z-10',
           plan.left === 0 && 'opacity-50 cursor-not-allowed',
         ]"
       >
         <header class='flex items-center justify-between ,t-'>
            <h3 class="text-2xl font-semibold text-white">{{ plan.name }}</h3>
            <Badge v-if="plan.save !== 'Save 0%' && plan.save" class="text-success bg-success/[0.12] hover:bg-success/[0.12] text-sm">{{ plan.save }}</Badge>
            <Badge v-if="plan.save === 'Save 0%' && plan.save" class="text-muted-foreground bg-muted-foreground/[0.12] hover:bg-muted-foreground/[0.12] text-sm">{{ plan.save }}</Badge>
            <Badge v-if="plan.left" class="text-muted-foreground bg-muted-foreground/[0.12] hover:bg-muted-foreground/[0.12] text-sm">{{ plan.left }} left</Badge>
            <Badge v-if="!plan.left && !plan.save" class="text-muted-foreground bg-muted-foreground/[0.12] hover:bg-muted-foreground/[0.12] text-sm">Sold out</Badge>
         </header>
         <article class="flex flex-col flex-grow">
            <section class="my-6">
               <h4 :class="[
                  'text-4xl font-bold',
                  plan.highlight ? 'text-premium' : 'text-white'
               ]" v-html="plan.price" />
               <p class="text-muted-foreground text-sm mt-1" v-html="plan.description" />
               <Button :disabled="plan.left === 0" :variant="plan.highlight ? 'premium' : 'secondary'" size="lg" @click="selectPlan(plan)" class="w-full mt-6">Get the {{ plan.name }} plan</Button>
            </section>
            <ul class="grid grid-cols-1 gap-3">
               <li v-for="benefit in plan.benefits" :key="benefit" class="flex gap-2 text-muted-foreground text-sm">
                  <OutlineCheck size="20" class="flex-shrink-0 text-success" />
                  <p v-html="benefit"/>
               </li>
            </ul>
         </article>
         <!-- <footer class="mt-6">
            <Button :disabled="plan.left === 0" :variant="plan.highlight ? 'premium' : 'secondary'" size="lg" @click="selectPlan(plan)" class="w-full">Get the {{ plan.name }} plan</Button>
         </footer> -->
       </div>
   </div>
 </template>

<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { OutlineCheck } from '@/components/ui/icons'

const plans = ref([
	{
		name: 'Lifetime',
		price: '$ 69.99 <span class="text-xl text-muted-foreground">/ Lifetime</span>',
		// save: 'Most popular',
		description: 'paid only once',
		benefits: [
			'Biggest <b class="text-white">savings</b>',
			'<b>Unlimited</b> access to all features',
			'<b>Priority</b> support',
			'One-time payment',
		],
		highlight: false,
      left: 0,
	},
	{
		name: 'Annual',
		price: '$ 3.49 <span class="text-xl text-muted-foreground">/ Month</span>',
		save: 'Save 65%',
		description: '<s>$119.88</s> $41.88 billed every year',
		benefits: [
			'<b>Unlimited</b> access to all features',
			'<b>Priority</b> support',
			'Billed annually',
		],
		highlight: true,
	},
	{
		name: 'Monthly',
		price: '$ 9.99 <span class="text-xl text-muted-foreground">/ Month</span>',
		save: 'Save 0%',
		description: '$9.99 billed every month',
		benefits: ['Access to all features', 'Standard support', 'Billed monthly'],
		highlight: false,
	},
])

const selectPlan = (plan) => {
	alert(`You have selected the ${plan.name} plan.`)
}
</script>