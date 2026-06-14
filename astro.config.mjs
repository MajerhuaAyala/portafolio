import { defineConfig } from 'astro/config'
import tailwindcss from "@tailwindcss/vite"

import robotsTxt from "astro-robots-txt"

// https://astro.build/config
export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  integrations: [robotsTxt()],
  site: 'https://majerhuaayala.github.io',
  base: "/portafolio"
})
