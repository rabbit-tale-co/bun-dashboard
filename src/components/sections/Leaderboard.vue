<template>
  <section v-if="totalPages >= 1" class="relative z-10">
    <div class="absolute h-5/6 lg:h-56 w-full bg-background -z-10" />
    <div class="mx-auto w-full max-w-screen-xl text-center p-6 lg:py-10">
      <h2 class="text-white mx-auto max-w-xl font-bold text-4xl leading-relaxed">Top 3 Leaderboard</h2>
      <h3 class="font-bold text-xl leading-tight">Tracked Over {{ formattedTotalXP }} XP</h3>
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
      <!-- <main class="mt-12">
        <div class="hidden lg:grid grid-cols-3 gap-8">
          <SkeletonCard v-for="i in usersPerPage" :key="i" v-if="isLoading" />
          <LeaderboardCard v-for="(user, index) in topUsers" :key="user.userId" :user="user" :index="index" :current-page="currentPage" :users-per-page="usersPerPage" v-else />
        </div>
        <div class="mt-6 flex justify-center gap-4">
          <Pagination v-if="totalPages > 1" v-slot="{ page }" :total="(totalPages * usersPerPage)" :sibling-count="1" v-model:page="currentPage" :items-per-page="usersPerPage">
            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
              <PaginationFirst />
              <PaginationPrev />

              <template v-for="(item, index) in items" :key="index">
                <PaginationListItem v-if="item.type === 'page'" :value="item.value" as-child>
                  <Button class="w-10 h-10 p-0" :variant="item.value === currentPage ? 'default' : 'outline'">
                    {{ item.value }}
                  </Button>
                </PaginationListItem>
                <PaginationEllipsis v-else :index="index" />
              </template>

              <PaginationNext />
              <PaginationLast />
            </PaginationList>
          </Pagination>
        </div>
      </main> -->
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch, watchEffect } from 'vue';
import { useLeaderboard } from '@/api/leaderboard';
import { commaFormatter } from '@/utils/formatter';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchTotalXPData } from '@/api/totalXP';
import { SolidCrown } from '../ui/icons'

const page = ref(1)
const limit = ref(3)
const { leaderboard, error, isValidating } = useLeaderboard(page.value, limit.value)
const topUsers = ref([])
const totalXP = ref(0)
const formattedTotalXP = computed(() => commaFormatter.format(totalXP.value))
const totalPages = ref(0)

const processLeaderboardData = (data) => {
  // console.log('Processing data:', data)
  topUsers.value = data.leaderboard || []
  totalXP.value = data.totalXp || 0
  totalPages.value = Math.ceil((data.totalUsers || 0) / limit.value)
  // console.log('topUsers:', topUsers.value)
  // console.log('totalXP:', totalXP.value)
  // console.log('totalPages:', totalPages.value)
}

watchEffect(() => {
  //console.log('watchEffect triggered')
  if (leaderboard.value) {
    // console.log('leaderboard.value:', leaderboard.value)
    processLeaderboardData(leaderboard.value)
  }
  if (error.value) {
    console.error('Error fetching leaderboard:', error.value)
  }
})
</script>
