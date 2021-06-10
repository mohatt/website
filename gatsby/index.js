const types = require('./types')
module.exports = {
  node: {
    createSchemaCustomization: types.createTypes,
    onCreateNode: types.createChildNodes,
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
