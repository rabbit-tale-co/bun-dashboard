import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
   css: {
      postcss: {
         plugins: [tailwind(), autoprefixer()],
      },
   },
   plugins: [vue()],
   resolve: {
      alias: [
         {
            find: '@',
            replacement: fileURLToPath(new URL('./src', import.meta.url)),
         },
         {
            find: '@components',
            replacement: fileURLToPath(
               new URL('./src/components', import.meta.url)
            ),
         },
         {
            find: '@lib',
            replacement: fileURLToPath(new URL('./src/lib', import.meta.url)),
         },
         {
            find: '@assets',
            replacement: fileURLToPath(
               new URL('./src/assets', import.meta.url)
            ),
         },
      ],
   },
})
