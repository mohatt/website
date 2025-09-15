/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path'
import tailwindConfig from './tailwind'
import defaultImportResolve from 'postcss-import/lib/resolve-id'

export default {
  plugins: [
    require('postcss-import')({
      resolve(id: string, ...args: any[]) {
        if (id.startsWith('@/')) {
          return path.resolve(__dirname, '../src/' + id.slice(2))
        }
        return defaultImportResolve(id, ...args)
      },
    }),
    require('postcss-url'),
    require('tailwindcss/nesting')('postcss-nesting'),
    require('tailwindcss')({
      config: tailwindConfig,
    }),
    require('postcss-preset-env')({
      // Use stage 1 features
      stage: 1,
      features: {
        // We let tailwindcss/nesting handle CSS nesting
        'nesting-rules': false,
      },
    }),
    // Useful for debugging
    require('postcss-reporter'),
  ],
}
