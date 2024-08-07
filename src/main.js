import { createApp } from 'vue'
import './index.css'
import router from './router'
import App from './App.vue'

import Servers from '@/components/sections/Servers.vue'
import Hero from '@/components/sections/Hero.vue'
import ServerCard from '@/components/sections/ServerCrad.vue'
import Features from '@/components/sections/Features.vue'
import Statistics from '@/components/sections/Statistics.vue'
import LeaderBoard from '@/components/sections/Leaderboard.vue'
import LeaderboardSkeletonCard from '@/components/sections/LeaderboardSkeletonCard.vue'
import LeaderboardCard from '@/components/sections/LeaderboardCard.vue'


createApp(App)
.component('Servers', Servers)
.component('Hero', Hero)
.component('ServerCard', ServerCard)
.component('Features', Features)
.component('Statistics', Statistics)
.component('Leaderboard', LeaderBoard)
.component('LeaderboardSkeletonCard', LeaderboardSkeletonCard)
.component('LeaderboardCard', LeaderboardCard)
.use(router)
.mount('#app')
