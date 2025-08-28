const { setupWebpack } = require('./gatsby')
const types = require('./gatsby/types')

module.exports = {
  createSchemaCustomization: types.createTypes,
  setFieldsOnGraphQLNodeType: types.extendTypes,
  onCreateNode: types.onCreateNode,
  shouldOnCreateNode: types.shouldOnCreateNode,
  onCreateWebpackConfig: setupWebpack,
}
