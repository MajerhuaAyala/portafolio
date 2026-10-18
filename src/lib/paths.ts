function basePrefix(): string {
  return import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`
}

export function withBase(assetPath: string): string {
  if (!assetPath) return basePrefix()
  if (/^(https?:)?\/\//.test(assetPath)) return assetPath

  const base = basePrefix()
  const normalized = assetPath.replace(/^\//, "")
  const basePath = base.replace(/^\//, "").replace(/\/$/, "")
  if (normalized === basePath || normalized.startsWith(`${basePath}/`)) {
    return `/${normalized}`
  }
  return `${base}${normalized}`
}

/** Locale-prefixed path. `subpath` is everything after the locale segment. */
export function localePath(locale: string, subpath = ""): string {
  const clean = subpath.replace(/^\/+|\/+$/g, "")
  return withBase(clean ? `${locale}/${clean}/` : `${locale}/`)
}
