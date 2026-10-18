/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare const process: {
  cwd(): string
}

declare module "node:fs/promises" {
  export function readdir(path: string): Promise<string[]>
  export function readFile(path: string): Promise<Uint8Array>
}

declare module "node:path" {
  interface PathApi {
    join(...paths: string[]): string
  }
  const path: PathApi
  export default path
}
