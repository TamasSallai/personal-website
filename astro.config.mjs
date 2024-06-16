import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import icon from "astro-icon"

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), react()],
  output: "server",
  i18n: {
    defaultLocale: "hu",
    locales: ["hu", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
})
