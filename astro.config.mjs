import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import compress from 'astro-compress'

// https://astro.build/config
export default defineConfig({
  server: {
    open: true,
  },
  integrations: [react(), mdx(), compress()],
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.').at(-1)
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img'
            }
            if (/ts|js/i.test(extType)) {
              extType = 'script'
            }
            if (/css|scss/i.test(extType)) {
              extType = 'styles'
            }
            return `assets/${extType}/[name]-[hash][extname]`
          },
        },
      },
    },
  },
})
