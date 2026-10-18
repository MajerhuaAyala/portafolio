export interface DurationUnits {
  year: string
  years: string
  month: string
  months: string
}

const YEAR_MONTH = /^(\d{4})-(\d{2})$/

export function parseYearMonth(value: string): { year: number; month: number } {
  const match = YEAR_MONTH.exec(value)
  if (!match) throw new Error(`Invalid year-month: ${value}`)

  const year = Number(match[1])
  const month = Number(match[2])
  if (month < 1 || month > 12) throw new Error(`Invalid year-month: ${value}`)

  return { year, month }
}

/**
 * Months from `start` through `end`, counting the start month.
 * A null end uses the build date (year and month of `now`).
 */
export function monthsBetween(start: string, end: string | null, now: Date = new Date()): number {
  const from = parseYearMonth(start)
  const to = end
    ? parseYearMonth(end)
    : { year: now.getFullYear(), month: now.getMonth() + 1 }

  return Math.max(0, (to.year - from.year) * 12 + (to.month - from.month) + 1)
}

export function formatDuration(totalMonths: number, units: DurationUnits): string {
  const months = Math.max(0, totalMonths)
  const years = Math.floor(months / 12)
  const remainder = months % 12
  const parts: string[] = []

  if (years > 0) parts.push(`${years} ${years === 1 ? units.year : units.years}`)
  if (remainder > 0) parts.push(`${remainder} ${remainder === 1 ? units.month : units.months}`)
  if (parts.length === 0) return `0 ${units.months}`

  return parts.join(" ")
}

export function formatYearMonth(value: string, locale: string): string {
  const { year, month } = parseYearMonth(value)
  const formatted = new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)))

  return formatted.charAt(0).toLocaleUpperCase(locale) + formatted.slice(1)
}

export function formatPeriod(
  start: string,
  end: string | null,
  present: string,
  locale: string,
): string {
  const startLabel = formatYearMonth(start, locale)
  const endLabel = end ? formatYearMonth(end, locale) : present
  return `${startLabel} – ${endLabel}`
}
