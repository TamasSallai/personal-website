import { defineConfig } from "astro/config"
import cloudflare from "@astrojs/cloudflare"
import react from "@astrojs/react"
import icon from "astro-icon"

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), react()],
  i18n: {
    defaultLocale: "hu",
    locales: ["hu", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  output: "server",
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
})
