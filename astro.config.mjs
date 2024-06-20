import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import node from "@astrojs/node"
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
  adapter: node({
    mode: "standalone",
  }),
})
