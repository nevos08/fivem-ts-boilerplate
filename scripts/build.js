import { createBuilder } from '@overextended/fx-utils'

const watch = process.argv.includes('--watch')

createBuilder(
  watch,
  {
    dropLabels: !watch ? ['DEV'] : undefined,
  },
  [
    {
      name: 'server',
      options: {
        platform: 'node',
        target: ['node16'],
        format: 'cjs',
      },
    },
    {
      name: 'client',
      options: {
        platform: 'browser',
        target: ['es2021'],
        format: 'iife',
      },
    },
  ],
  async (files) => {
    const files = await getFiles('dist/web', 'static')
    await createFxmanifest({
      client_scripts: [outfiles.client],
      server_scripts: [outfiles.server],
      files: [...files],
      dependencies: ['/server:7290', '/onesync'],
      metadata: {
        ui_page: 'dist/web/index.html',
      },
    })
  },
)

async function getFiles(...args) {
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
