import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				accent:
					'bg-accent-foreground text-accent hover:bg-accent/90',
				premium:'bg-premium text-premium-foreground dark:bg-premium/[0.12] dark:text-premium dark:hover:bg-premium/[0.24] hover:bg-premium/90',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary/60 text-secondary-foreground dark:hover:bg-secondary/80',
				ghost: 'hover:bg-secondary hover:text-secondary-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-4 py-2',
				defaultIcon: 'h-10 pr-4 pl-3',
				link: '',
				linkIcon: 'pr-1',
				xs: 'h-7 rounded px-2',
				xsIcon: 'h-7 pr-2 pl-1',
				sm: 'h-9 rounded-md px-3',
				smIcon: 'h-9 pr-3 pl-2',
				lg: 'h-11 rounded-md px-8',
				lgIcon: 'h-11 pr-8 pl-7',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)
