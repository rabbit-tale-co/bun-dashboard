<template>
  <form @submit.prevent="onSubmit" class="space-y-6 relative">
    <FormField name="welcomeChannelId" v-slot="{ field, errors }">
      <FormItem class="flex flex-col">
        <FormLabel>Channel</FormLabel>
        <Popover v-if="isDesktop" v-model:open="isOpen">
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              role="combobox"
              :class="['justify-between', !values.welcomeChannelId && 'text-muted-foreground']"
            >
              {{
                values.welcomeChannelId
                  ? channels.find(channel => channel.id === values.welcomeChannelId)?.name
                  : 'Select channel...'
              }}
              <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="p-0">
            <Command>
              <CommandInput placeholder="Search channel..." />
              <CommandEmpty>Nothing found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="channel in channels"
                    :key="channel.id"
                    :value="channel.name"
                    @select="() => {
                      setFieldValue('welcomeChannelId', channel.id)
                      isOpen = false
                    }"
                  >
                    <Check
                      :class="['mr-2 size-4', channel.id === values.welcomeChannelId ? 'opacity-100' : 'opacity-0']"
                    />
                    {{ channel.name }}
                    <OutlineContentCopy
                      class="ml-auto size-5 text-muted-foreground cursor-pointer"
                      @click.stop="copyChannelId(channel.id)"
                    />
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Drawer v-else :open="isOpen" @update:open="newOpenValue => (isOpen = newOpenValue)">
          <DrawerTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                :class="['justify-between', !values.welcomeChannelId && 'text-muted-foreground']"
              >
                {{
                  values.welcomeChannelId
                    ? channels.find(channel => channel.id === values.welcomeChannelId)?.name
                    : 'Select channel...'
                }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </DrawerTrigger>
          <DrawerContent>
            <div class="mt-4 border-t">
              <Command>
                <CommandInput placeholder="Search channel..." />
                <CommandEmpty>Nothing found.</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    <CommandItem
                      v-for="channel in channels"
                      :key="channel.id"
                      :value="channel.name"
                      @select="() => {
                        setFieldValue('welcomeChannelId', channel.id)
                        isOpen = false
                      }"
                    >
                      <Check
                        :class="['mr-2 h-4 w-4', channel.id === values.welcomeChannelId ? 'opacity-100' : 'opacity-0']"
                      />
                      {{ channel.name }}
                      <OutlineContentCopy
                      class="ml-auto size-5 text-muted-foreground cursor-pointer"
                      @click.stop="copyChannelId(channel.id)"
                    />
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </DrawerContent>
        </Drawer>
        <FormDescription>Select the channel for the welcome message or click icon to copy the ID.</FormDescription>
        <FormMessage v-if="errors.length">{{ errors[0] }}</FormMessage>
      </FormItem>
    </FormField>

    <FormField name="welcomeMessage" v-slot="{ field, errors }">
      <FormItem>
        <FormLabel>Welcome Message</FormLabel>
        <FormControl>
          <Textarea ref="textarea" placeholder="Welcome to our server!" v-bind="field" />
        </FormControl>
        <FormDescription>
          This is your welcome message. Use <code><#channelID></code> to mention channels.
          You can also use <code>{server}</code> to display the server name and <code>{user}</code> to ping the user.
        </FormDescription>
        <FormMessage v-if="errors.length">{{ errors[0] }}</FormMessage>
      </FormItem>
    </FormField>
    <Button type="submit">Save Changes</Button>
  </form>
</template>


<script setup>
import { ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { OutlineContentCopy } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { toast } from 'vue-sonner'
import { toTypedSchema } from '@vee-validate/zod'

const props = defineProps({
	serverId: { type: String, required: true },
	channels: { type: Array, required: true },
})

const formSchema = toTypedSchema(
	z.object({
		welcomeMessage: z
			.string()
			.min(10, 'Welcome Message must be at least 10 characters.'),
		welcomeChannelId: z.string().min(1),
	}),
)

const { handleSubmit, setFieldValue, values, resetForm } = useForm({
	validationSchema: formSchema,
	initialValues: {
		welcomeMessage: '',
		welcomeChannelId: '',
	},
})

const isDesktop = ref(window.innerWidth >= 768)
const isOpen = ref(false)
const channels = ref(props.channels || [])

const onSubmit = handleSubmit((values) => {
	const formattedWelcomeMessage = values.welcomeMessage.replace(/\r?\n/g, '\\n')

	const payload = {
		...values,
		welcomeMessage: formattedWelcomeMessage,
		serverId: props.serverId,
	}

	const fetchPromise = fetch('https://api.rabbittale.co/api/db/saveGreetings', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	}).then(async (response) => {
		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.message)
		}

		return response.json()
	})

	toast.promise(fetchPromise, {
		loading: 'Saving welcome message...',
		success: (data) => {
			resetForm()
			return data.message
		},
		error: (error) =>
			`Error saving welcome message: ${error.message || 'An unexpected error occurred.'}`,
	})
})

const copyChannelId = (channelId) => {
  navigator.clipboard.writeText(channelId).then(() => {
    toast.success('Channel ID copied to clipboard')
  })
}


// Watching for prop change
watch(
	() => props.channels,
	(newChannels) => {
		channels.value = newChannels
	},
	{ immediate: true },
)
</script>