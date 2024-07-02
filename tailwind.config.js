const animate = require('tailwindcss-animate')

/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: ['class'],
   safelist: ['dark'],
   prefix: '',

   content: [
      './views/**/*.{js,jsx,vue}',
      './components/**/*.{js,jsx,vue}',
      './src/**/*.{js,jsx,vue}',
   ],

   theme: {
      container: {
         center: true,
         padding: '2rem',
         screens: {
            '2xl': '1400px',
         },
      },
      extend: {
         minHeight: {
            'screen-20': 'calc(100vh - 20%)'
          },
         colors: {
            border: 'hsla(var(--border))',
            scrollbar: {
               track: 'hsla(var(--scrollbar-track))',
               hover: 'hsla(var(--scrollbar-hover))',
               thumb: 'hsla(var(--scrollbar-thumb))',
            },
            input: 'hsla(var(--input))',
            ring: 'hsla(var(--ring))',
            background: 'hsla(var(--background))',
            backgroundSecondary: 'hsla(var(--background-secondary))',
            foreground: 'hsla(var(--foreground))',
            primary: {
               DEFAULT: 'hsla(var(--primary))',
               foreground: 'hsla(var(--primary-foreground))',
            },
            secondary: {
               DEFAULT: 'hsla(var(--secondary))',
               foreground: 'hsla(var(--secondary-foreground))',
            },
            premium: {
               DEFAULT: 'hsl(var(--premium))',
               foreground: 'hsl(var(--premium-foreground))',
            },
            destructive: {
               DEFAULT: 'hsla(var(--destructive))',
               foreground: 'hsla(var(--destructive-foreground))',
            },
            muted: {
               DEFAULT: 'hsla(var(--muted))',
               foreground: 'hsla(var(--muted-foreground))',
            },
            accent: {
               DEFAULT: 'hsla(var(--accent))',
               foreground: 'hsla(var(--accent-foreground))',
            },
            popover: {
               DEFAULT: 'hsla(var(--popover))',
               foreground: 'hsla(var(--popover-foreground))',
            },
            card: {
               DEFAULT: 'hsla(var(--card))',
               foreground: 'hsla(var(--card-foreground))',
               hover: 'hsla(var(--card-hover))',
            },
         },
         borderRadius: {
            xl: 'calc(var(--radius) + 4px)',
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)',
         },
         transitionTimingFunction: {
            bounce: 'cubic-bezier(0.2, -0.25, 0, 1.6)',
         },
         keyframes: {
            'accordion-down': {
               from: { height: 0 },
               to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
               from: { height: 'var(--radix-accordion-content-height)' },
               to: { height: 0 },
            },
            'collapsible-down': {
               from: { height: 0 },
               to: { height: 'var(--radix-collapsible-content-height)' },
            },
            'collapsible-up': {
               from: { height: 'var(--radix-collapsible-content-height)' },
               to: { height: 0 },
            },
            fade: {
               from: {
                  opacity: '0%',
               },
               to: {
                  opacity: '100%',
               },
            },

            scaleFade: {
               from: {
                  opacity: '0%',
                  transform: 'scale(0.75)',
               },
               to: {
                  opacity: '100%',
                  transform: 'scale(1)',
               },
            },

            scaleOutFade: {
               from: {
                  opacity: '100%',
                  transform: 'scale(1)',
               },
               to: {
                  opacity: '0%',
                  transform: 'scale(0.75)',
               },
            },

            reveal: {
               from: {
                  opacity: '0%',
                  transform: 'translateY(40px)',
               },
               to: {
                  opacity: '100%',
                  transform: 'translateY(0px)',
               },
            },

            modalReveal: {
               from: {
                  opacity: '0%',
                  transform: 'scale(0.7) translateY(100px)',
               },
               to: {
                  opacity: '100%',
                  transform: 'scale(1) translateY(0px) rotate(0deg)',
               },
            },

            rotate: {
               from: {
                  opacity: '0%',
                  transform: 'translateY(40px) rotate(6deg)',
               },
               to: {
                  opacity: '100%',
                  transform: 'translateY(0px) rotate(0deg)',
               },
            },

            rotateAlt: {
               from: {
                  opacity: '0%',
                  transform: 'translateY(40px) rotate(-6deg)',
               },
               to: {
                  opacity: '100%',
                  transform: 'translateY(0px) rotate(0deg)',
               },
            },

            bouncy: {
               to: {
                  transform: 'translateY(-8px)',
               },
            },

            bouncyLite: {
               to: {
                  transform: 'translateY(-4px)',
               },
            },

            marquee: {
               '0%': { transform: 'translateX(100%)' },
               '100%': { transform: 'translateX(-100%)' },
            },

            shake: {
               '0%, 100%': { transform: 'translateX(0)' },
               '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-1px)' },
               '20%, 40%, 60%, 80%': { transform: 'translateX(1px)' },
            },
            bounce: {
               '0%, 100%': {
                  transform: 'translateY(0)',
               },
               '50%': {
                  transform: 'translateY(-8px)',
               },
            }
         },
         animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
            'collapsible-down': 'collapsible-down 0.2s ease-in-out',
            'collapsible-up': 'collapsible-up 0.2s ease-in-out',
            fadeXs: 'fade 0.2s forwards',
            fadeSm: 'fade 0.4s forwards',
            fade: 'fade 0.8s forwards',
            fadeMd: 'fade 1.2s forwards',
            fadeLg: 'fade 1.6s forwards',
            fadeXl: 'fade 2s forwards',

            scaleFade: 'scaleFade 0.4s cubic-bezier(0.7,0,0.5,2) forwards',
            scaleOutFade:
               'scaleOutFade 0.4s cubic-bezier(0.7,0,0.5,2) forwards',

            revealSm: 'reveal 0.8s cubic-bezier(0.5,-0.2,0.1,1.2) forwards',
            reveal: 'reveal 1.2s cubic-bezier(0.5,-0.2,0.1,1.3) forwards',
            revealMd: 'reveal 1.4s cubic-bezier(0.5,-0.2,0.1,1.4) forwards',
            revealLg: 'reveal 1.6s cubic-bezier(0.5,-0.2,0.1,1.5) forwards',
            modalReveal: 'modalReveal 0.6s cubic-bezier(0,1,0,1.1) forwards',

            rotate: 'rotate 1s cubic-bezier(0.5,-0.5,0.1,1.8) forwards',
            rotateAlt: 'rotateAlt 1s cubic-bezier(0.5,1,0.1,1.8) forwards',

            marquee: 'marquee 10s linear infinite',
            shake: 'shake 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
            bounce: 'bounce 1s ease infinite',
         },
      },
   },
   plugins: [animate, require('@tailwindcss/typography')],
}
