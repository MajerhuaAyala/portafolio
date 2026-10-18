import { readdir } from "node:fs/promises"
import path from "node:path"
import { publicImage, type PublicImage } from "@/lib/imageMeta"

const IMAGE_FILE = /\.(webp|png|jpe?g|avif)$/i

export async function getImages(dirname: string): Promise<PublicImage[]> {
  const folder = path.join(process.cwd(), "public", "projects", dirname)
  try {
    const entries = await readdir(folder)
    const names = entries
      .filter((name) => IMAGE_FILE.test(name))
      .sort((a, b) => a.localeCompare(b, "en"))
    return Promise.all(names.map((name) => publicImage(`projects/${dirname}/${name}`)))
  } catch {
    return []
  }
}
