const types = require('./types')
module.exports = {
  node: {
    createSchemaCustomization: types.createTypes,
    setFieldsOnGraphQLNodeType: types.extendTypes,
    onCreateNode: types.onCreateNode,
    unstable_shouldOnCreateNode: types.shouldOnCreateNode,
    onCreateWebpackConfig: require('./webpack')
  },
  ssr: {
    onRenderBody: args => {
      require('./setup-theme')(args)
    },
    onPreRenderHTML: args => {
      require('./reorder-head-tags')(args)
    }
  }
}
