import useSWRV from 'swrv'
import { fetchBotGuildsData } from '@/api/botGuilds' // Assuming the function is exported from botGuilds

const fetchGuilds = async (accessToken) => {
  const response = await fetch('https://discord.com/api/users/@me/guilds', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch guilds')
  }

  const userGuilds = await response.json()

  // Fetch bot guilds
  const botGuilds = await fetchBotGuildsData()

  const botGuildIds = new Set(botGuilds.map((guild) => guild.id))

  const guildList = userGuilds.map((guild) => {
    const isAdmin = (guild.permissions & 0x8) === 0x8
    const isBotMember = botGuildIds.has(guild.id)

    return {
      id: guild.id,
      name: guild.name,
      iconUrl: guild.icon
        ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=4096`
        : null,
      isAdmin,
      isBotMember,
    }
  })

  return guildList
}

export const useGuilds = (accessToken) => {
  const { data, error, isValidating } = useSWRV(
    accessToken ? `guilds-${accessToken}` : null,
    () => fetchGuilds(accessToken),
    { revalidateOnFocus: false, ttl: 3600 * 1000 }, // added TTL for caching
  )

  return {
    guilds: data,
    error,
    isPending: isValidating,
  }
}

// import useSWRV from 'swrv';
// import { ref } from 'vue';

// const fetchGuilds = async (accessToken) => {
//   const response = await fetch('https://discord.com/api/users/@me/guilds', {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch guilds');
//   }

//   const guildData = await response.json();

//   const guildList = await Promise.all(
//     guildData.map(async (guild) => {
//       const isAdmin = (guild.permissions & 0x8) === 0x8;
//       const guildDetails = await fetch(
//         `https://api.rabbittale.co/api/guilds/checkBotMembership?guildId=${guild.id}`
//       );
//       const data = await guildDetails.json();

//       return {
//         id: guild.id,
//         name: guild.name,
//         iconUrl: guild.icon
//           ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=4096`
//           : null,
//         isAdmin,
//         isBotMember: data.isBotMember,
//       };
//     })
//   );

//   return guildList;
// };

// export const useGuilds = (accessToken) => {
//   const { data, error, isValidating } = useSWRV(
//     accessToken ? `guilds-${accessToken}` : null,
//     () => fetchGuilds(accessToken),
//     { revalidateOnFocus: false }
//   );

//   return {
//     guilds: data,
//     error,
//     isPending: isValidating,
//   };
// };
