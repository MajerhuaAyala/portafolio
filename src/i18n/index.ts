import type { Dictionary, Locale } from "./types"
import { en } from "./en"
import { es } from "./es"
import { localePath } from "@/lib/paths"

export type { Dictionary, Locale } from "./types"

export const locales = ["es", "en"] as const
export const defaultLocale: Locale = "es"

const dictionaries: Record<Locale, Dictionary> = { es, en }

export function getDictionary(locale: string): Dictionary {
  if (locale === "en") return dictionaries.en
  return dictionaries.es
}

export function localizedPath(locale: Locale): string {
  return localePath(locale)
}
