import { ref } from 'vue';
import { fetchTotalXPData } from '@/api/totalXP'; // Adjust the import path as necessary

const totalXP = ref(0);

const fetchTotalXP = async () => {
  try {
    const xp = await fetchTotalXPData();
    totalXP.value = xp;
    return xp;
  } catch (error) {
    console.error('Failed to fetch total XP:', error);
    return 0;
  }
};

export const useTotalXP = () => {
  return {
    fetchTotalXP,
    totalXP,
  };
};
