import path from 'path'
import type { GatsbyNode } from 'gatsby'
import type { Configuration as WebpackConfig } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../src'),
      },
    },
  } as WebpackConfig)

  // Build-only configuration
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: 'webpack.report.html',
          openAnalyzer: false,
        }),
      ],
    } as WebpackConfig)
  }
}

export {
  createSchemaCustomization,
  setFieldsOnGraphQLNodeType,
  onCreateNode,
  shouldOnCreateNode,
} from './types'
