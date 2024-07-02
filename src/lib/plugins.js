import { ref, computed } from 'vue';
import {
  SolidCarrot,
  SolidCommand,
  SolidSend,
  OutlineCommand,
  OutlineSend,
} from '@/components/ui/icons';
import { guildID } from '@/api/guildId';

const plugins = computed(() => [
  {
    path: `/manage/${guildID.value}/welcome`,
    title: 'Welcome & Goodbye',
    description: 'Automatically send messages and give roles to your new members and send a message when a member leaves your server',
    iconSolid: SolidSend,
    iconOutline: OutlineSend,
    badge: SolidCarrot,
    category: 'Essentials',
    premium: true,
    active: true
  },
  {
    path: `/manage/${guildID.value}/welcome-channel`,
    title: 'Welcome Channel',
    description: 'A dedicated place to welcome new members and share essential informations',
    iconSolid: SolidCommand,
    iconOutline: OutlineCommand,
    category: 'Essentials',
    premium: false,
    active: false
  },
  {
    path: `/manage/${guildID.value}/utilities`,
    title: 'Utilities',
    description: 'Useful commands and tools for your server',
    iconSolid: SolidCommand,
    iconOutline: OutlineCommand,
    category: 'Utilities',
    premium: true,
    active: false
  },
  {
    path: `/manage/${guildID.value}/social-alerts`,
    title: 'Social Alerts',
    description: 'Get alerts for social media posts',
    iconSolid: SolidCommand,
    iconOutline: OutlineCommand,
    category: 'Social Alerts',
    premium: false,
    active: true
  },
  {
    path: `/manage/${guildID.value}/games-fun`,
    title: 'Games & Fun',
    description: 'Play games and have fun with your server members',
    iconSolid: SolidCommand,
    iconOutline: OutlineCommand,
    category: 'Games & Fun',
    premium: true,
    active: false
  },
]);

const categorizedItems = computed(() => {
  return plugins.value.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
});

export { plugins, categorizedItems };
