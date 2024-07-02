<template>
  <section v-if="totalPages >= 1" class="relative z-10">
    <div class="absolute h-56 w-full bg-background -z-10" />
    <div class="mx-auto w-full max-w-screen-xl text-center p-6 lg:py-10">
      <h2 class="text-white mx-auto max-w-xl font-bold text-4xl leading-relaxed">Leaderboard</h2>
      <h3 class="font-bold text-xl leading-tight">Tracked Over {{ formattedTotalXP }} XP</h3>
      <main class="mt-12">
        <div class="hidden lg:grid grid-cols-3 gap-8">
          <div v-if="isLoading" v-for="i in usersPerPage" :key="i" class="bg-card-hover rounded-lg px-6 py-5 flex items-center justify-start h-24 overflow-x-hidden">
            <p>#0</p>
            <Skeleton class="size-12 rounded-full ml-4 bg-white/10" />
            <div class="ml-4 text-left text-base flex flex-1 flex-col">
              <Skeleton class="w-3/4 h-5 mb-2 bg-white/10" />
              <Skeleton class="w-1/2 h-4 bg-white/10" />
            </div>
          </div>
          <div v-else v-for="(user, index) in topUsers" :key="user.userId" class="bg-card-hover rounded-lg px-6 py-5 flex items-center justify-start h-24 overflow-x-hidden">
            <p :class="getRankClass((currentPage - 1) * usersPerPage + index)">
              #{{ (currentPage - 1) * usersPerPage + index + 1 }}
            </p>
            <img :src="user.avatarUrl" class="size-12 rounded-full ml-4" :alt="user.username">
            <div class="ml-4 text-left text-base">
              <div class="flex items-start justify-start text-white">
                <p class="font-bold line-clamp-1">{{ user.globalName }}</p>
              </div>
              <div class="flex items-center justify-start text-muted-foreground">
                <p class="text-base">{{ commaFormatter.format(user.xp) }} XP</p>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:hidden grid md:grid-cols-2 gap-8">
          <div v-if="isLoading" v-for="i in usersPerPage" :key="i" class="bg-card-hover rounded-lg px-6 py-5 flex items-center justify-start h-24 overflow-x-hidden">
            <p>#0</p>
            <Skeleton class="size-12 rounded-full ml-4 bg-white/10" />
            <div class="ml-4 text-left text-base flex flex-1 flex-col">
              <Skeleton class="w-3/4 h-5 mb-2 bg-white/10" />
              <Skeleton class="w-1/2 h-4 bg-white/10" />
            </div>
          </div>
          <div v-else v-for="(user, index) in topUsers" :key="user.userId" class="bg-card-hover rounded-lg px-6 py-5 flex items-center justify-start h-24 overflow-x-hidden">
            <p :class="getRankClass((currentPage - 1) * usersPerPage + index)">
              #{{ (currentPage - 1) * usersPerPage + index + 1 }}
            </p>
            <img :src="user.avatarUrl" class="size-12 rounded-full ml-4" :alt="user.username">
            <div class="ml-4 text-left text-base">
              <div class="flex items-start justify-start text-white">
                <p class="font-bold line-clamp-1">{{ user.globalName }}</p>
              </div>
              <div class="flex items-center justify-start text-muted-foreground">
                <p class="text-base">{{ commaFormatter.format(user.xp) }} XP</p>
              </div>
            </div>
          </div>
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
      </main>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
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

const { fetchGlobalLeaderboardData, isPending, error } = useLeaderboard();
const topUsers = ref([]);
const totalXP = ref(0);
const formattedTotalXP = computed(() => commaFormatter.format(totalXP.value));

const currentPage = ref(1);
const usersPerPage = ref(9); // Set the number of users per page as a ref

const totalPages = ref(0);
const isLoading = ref(false);

const fetchLeaderboard = async (page, limit) => {
  isLoading.value = true;
  error.value = null;
  try {
    const { leaderboard, totalUsers, totalXp } = await fetchGlobalLeaderboardData(
      page,
      limit,
    );
    totalXP.value = totalXp;
    topUsers.value = leaderboard;
    totalPages.value = Math.ceil(totalUsers / limit);
  } catch (err) {
    error.value = err.message;
    console.error('Error fetching leaderboard:', err);
  } finally {
    isLoading.value = false;
  }
};

const getRankClass = (rank) => {
  if (rank === 0) return 'text-[#ffd700]';
  if (rank === 1) return 'text-[#c0c0c0]';
  if (rank === 2) return 'text-[#cd7f32]';
  return 'text-white/30';
};

const refreshData = async () => {
  await fetchLeaderboard(currentPage.value, usersPerPage.value);
};

const updateUsersPerPage = () => {
  if (window.innerWidth >= 1024) {
    usersPerPage.value = 9;
  } else {
    usersPerPage.value = 3;
  }
};

// Register lifecycle hooks before any await statements
onBeforeUnmount(() => {
  clearInterval(intervalId);
  window.removeEventListener('resize', updateUsersPerPage);
});

onMounted(async () => {
  updateUsersPerPage();
  window.addEventListener('resize', updateUsersPerPage);
  await refreshData(); // Initial load
  const intervalId = setInterval(refreshData, 15 * 60 * 1000); // Refresh every 15 minutes
});

watch(currentPage, async (newPage) => {
  await fetchLeaderboard(newPage, usersPerPage.value);
});

// Watch for usersPerPage changes and refresh data once
watch(usersPerPage, async (newUsersPerPage, oldUsersPerPage) => {
  if (newUsersPerPage !== oldUsersPerPage) {
    await refreshData();
  }
});
</script>
