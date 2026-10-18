export type MarkSegment =
  | { type: "text"; value: string }
  | { type: "mark"; value: string }

const MARK = /==([\s\S]*?)==/

/** Split on the first `==phrase==`. Later markers stay literal text. */
export function splitMarked(input: string): MarkSegment[] {
  const match = MARK.exec(input)
  if (!match) return [{ type: "text", value: input }]

  const before = input.slice(0, match.index)
  const marked = match[1]
  const after = input.slice(match.index + match[0].length)
  const segments: MarkSegment[] = []

  if (before) segments.push({ type: "text", value: before })
  if (marked) segments.push({ type: "mark", value: marked })
  if (after) segments.push({ type: "text", value: after })

  return segments.length > 0 ? segments : [{ type: "text", value: input }]
}

/** Remove highlighter markers for plain-text contexts such as meta descriptions. */
export function stripMarks(input: string): string {
  return input.replace(/==([\s\S]*?)==/g, "$1")
}
