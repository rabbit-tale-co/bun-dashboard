import { ref } from 'vue';
import { fetchGuildsData, error as guildError, isPending as guildIsPending } from '@/api/guilds';

const guilds = ref([]);

const fetchGuilds = async (accessToken) => {
    try {
        const guildsList = await fetchGuildsData(accessToken);
        guilds.value = guildsList;
    } catch (err) {
        console.error('Error fetching user guilds:', err);
    }
};

export const useGuilds = () => {
    return {
        fetchGuilds,
        guilds,
        guildIsPending,
        guildError,
    };
};
