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
})
