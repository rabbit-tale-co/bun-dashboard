import { ref } from 'vue';

export const guildID = ref(null);

export const setGuildID = (id) => {
  guildID.value = id;
};
