import { ref } from 'vue';
import { fetchBotGuildsData, error as botGuildError, isPending as botGuildIsPending } from '@/api/botGuilds';

const botGuilds = ref([]);

const fetchBotGuilds = async () => {
    if (botGuilds.value.length > 0) return;

    try {
        const guildsList = await fetchBotGuildsData();
        botGuilds.value = guildsList;
    } catch (err) {
        console.error('Error fetching bot guilds:', err);
    }
};

export const useBotGuilds = () => {
    return {
        fetchBotGuilds,
        botGuilds,
        botGuildIsPending,
        botGuildError,
    };
};
