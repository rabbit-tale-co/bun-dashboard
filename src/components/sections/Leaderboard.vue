<template>
  <section v-if="totalPages >= 1" class="relative z-10">
    <div class="absolute h-5/6 lg:h-56 w-full bg-background -z-10"></div>
    <div class="mx-auto w-full max-w-screen-xl text-center p-6 lg:py-10">
      <h2 class="text-white mx-auto max-w-xl font-bold text-4xl leading-relaxed">Top 3 Leaderboard</h2>
      <h3 class="font-bold text-xl leading-tight">
        Tracked Over <span ref="animatedNumber" class="tabular-nums">{{ formattedTotalXP }}</span> XP
      </h3>
      <main class="mt-12">
        <div v-if="error" class="text-red-500">{{ error.message || 'Failed to fetch leaderboard' }}</div>
        <div class="hidden lg:grid grid-cols-3 gap-8">
          <LeaderboardSkeletonCard v-for="i in usersPerPage" :key="i" v-if="isValidating" />
          <LeaderboardCard v-for="(user, index) in topUsers" :key="user.userId" :user="user" :index="index" :current-page="page" :users-per-page="limit" v-else />
        </div>
        <div class="lg:hidden grid md:grid-cols-1 gap-8">
          <LeaderboardSkeletonCard v-for="i in usersPerPage" :key="i" v-if="isValidating" />
          <LeaderboardCard v-for="(user, index) in topUsers" :key="user.userId" :user="user" :index="index" :current-page="page" :users-per-page="limit" v-else />
        </div>
      </main>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useLeaderboard } from '@/api/leaderboard'
import { commaFormatter } from '@/utils/formatter'
import { animateNumber } from '@/utils/animateNumber'

const page = ref(1)
const limit = ref(3)
const { leaderboard, error, isValidating } = useLeaderboard(
	page.value,
	limit.value,
)
const topUsers = ref([])
const totalXP = ref(0)
const totalPages = ref(0)
const formattedTotalXP = ref('0')

const processLeaderboardData = (data) => {
	topUsers.value = data.leaderboard || []
	totalXP.value = data.totalXp || 0
	totalPages.value = Math.ceil((data.totalUsers || 0) / limit.value)
}

watchEffect(() => {
	if (leaderboard.value) {
		processLeaderboardData(leaderboard.value)
		animateNumber(0, totalXP.value, 3000, (value) => {
			formattedTotalXP.value = commaFormatter.format(value)
		})
	}
	if (error.value) {
		console.error('Error fetching leaderboard:', error.value)
	}
})

onMounted(async () => {
	if (leaderboard.value) {
		processLeaderboardData(leaderboard.value)
		animateNumber(0, totalXP.value, 2000, (value) => {
			formattedTotalXP.value = commaFormatter.format(value)
		})
	}
})
</script>
