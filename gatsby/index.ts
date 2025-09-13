import type { GatsbyNode } from 'gatsby'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ stage, actions }) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: 'webpack.report.html',
          openAnalyzer: false,
        }),
      ],
    })
  }
}

export {
  createSchemaCustomization,
  setFieldsOnGraphQLNodeType,
  onCreateNode,
  shouldOnCreateNode,
} from './types'
