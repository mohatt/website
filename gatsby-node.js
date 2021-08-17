const { setupWebpack } = require('./gatsby')
const types = require('./gatsby/types')

module.exports = {
  createSchemaCustomization: types.createTypes,
  setFieldsOnGraphQLNodeType: types.extendTypes,
  onCreateNode: types.onCreateNode,
  unstable_shouldOnCreateNode: types.shouldOnCreateNode,
  onCreateWebpackConfig: setupWebpack,
}
