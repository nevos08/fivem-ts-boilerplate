//@ts-check

import { readdir } from 'fs/promises'

/**
 * Recursively read the files in a directory and return the paths.
 * @param args {string[]}
 * @return {Promise<string[]>}
 */
export async function getFiles(...args) {
  const files = await Promise.all(
    args.map(async (dir) => {
      try {
        const dirents = await readdir(`${dir}/`, { withFileTypes: true })
        const paths = await Promise.all(
          dirents.map(async (dirent) => {
            const path = `${dir}/${dirent.name}`
            return dirent.isDirectory() ? await getFiles(path) : path
          }),
        )

        return paths.flat()
      } catch (err) {
        return []
      }
    }),
  )

  return files.flat()
}
