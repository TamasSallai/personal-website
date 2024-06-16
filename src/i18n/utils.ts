import { ui, defaultLang } from "./ui"

type UILang = keyof typeof ui
type UILangKey = keyof (typeof ui)[typeof defaultLang]

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/")
  if (lang in ui) return lang as UILang
  return defaultLang
}

export function useTranslations(lang: UILang) {
  return function t(key: UILangKey) {
    return ui[lang][key] || ui[defaultLang][key]
  }
}
