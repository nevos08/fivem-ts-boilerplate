import { createBuilder } from '@overextended/fx-utils'
import { readdir } from 'fs/promises'

const watch = process.argv.includes('--watch')

createBuilder(
  true,
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
    console.log('files', files)
    const readFiles = await readdir('src/client')
    console.log('readFiles', readFiles)
  },
)
