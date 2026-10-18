import { readFile } from "node:fs/promises"
import path from "node:path"
import { withBase } from "@/lib/paths"

export interface RasterSize {
  width: number
  height: number
}

export interface PublicImage {
  src: string
  width: number
  height: number
}

function ascii(buf: Uint8Array, start: number, end: number): string {
  let out = ""
  for (let index = start; index < end; index += 1) out += String.fromCharCode(buf[index] ?? 0)
  return out
}

function u16le(buf: Uint8Array, offset: number): number {
  return (buf[offset] ?? 0) | ((buf[offset + 1] ?? 0) << 8)
}

function u16be(buf: Uint8Array, offset: number): number {
  return ((buf[offset] ?? 0) << 8) | (buf[offset + 1] ?? 0)
}

function u24le(buf: Uint8Array, offset: number): number {
  return (buf[offset] ?? 0) | ((buf[offset + 1] ?? 0) << 8) | ((buf[offset + 2] ?? 0) << 16)
}

function u32be(buf: Uint8Array, offset: number): number {
  return (
    (((buf[offset] ?? 0) << 24) |
      ((buf[offset + 1] ?? 0) << 16) |
      ((buf[offset + 2] ?? 0) << 8) |
      (buf[offset + 3] ?? 0)) >>>
    0
  )
}

export function parseRasterSize(buf: Uint8Array): RasterSize | null {
  if (buf.length >= 30 && ascii(buf, 0, 4) === "RIFF" && ascii(buf, 8, 12) === "WEBP") {
    const chunk = ascii(buf, 12, 16)
    if (chunk === "VP8X") {
      return { width: 1 + u24le(buf, 24), height: 1 + u24le(buf, 27) }
    }
    if (chunk === "VP8 ") {
      return { width: u16le(buf, 26) & 0x3fff, height: u16le(buf, 28) & 0x3fff }
    }
    if (chunk === "VP8L" && buf.length >= 25) {
      const b0 = buf[21] ?? 0
      const b1 = buf[22] ?? 0
      const b2 = buf[23] ?? 0
      const b3 = buf[24] ?? 0
      return {
        width: 1 + (((b1 & 0x3f) << 8) | b0),
        height: 1 + (((b3 & 0xf) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6)),
      }
    }
  }

  if (buf.length >= 24 && buf[0] === 0x89 && ascii(buf, 1, 4) === "PNG") {
    return { width: u32be(buf, 16), height: u32be(buf, 20) }
  }

  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2
    while (offset + 9 < buf.length) {
      if (buf[offset] !== 0xff) break
      const marker = buf[offset + 1] ?? 0
      if (marker === 0xff) {
        offset += 1
        continue
      }
      if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
        return { height: u16be(buf, offset + 5), width: u16be(buf, offset + 7) }
      }
      if (marker === 0xd8 || marker === 0xd9 || marker === 0x01) {
        offset += 2
        continue
      }
      const size = u16be(buf, offset + 2)
      if (size < 2) break
      offset += 2 + size
    }
  }

  return null
}

export async function publicImage(assetPath: string): Promise<PublicImage> {
  const normalized = assetPath.replace(/^\//, "")
  const filePath = path.join(process.cwd(), "public", normalized)
  const buf = await readFile(filePath)
  const size = parseRasterSize(buf)
  if (!size || size.width < 1 || size.height < 1) {
    throw new Error(`Could not read image dimensions: ${normalized}`)
  }
  return { src: withBase(normalized), width: size.width, height: size.height }
}
