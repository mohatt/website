module.exports = {
  createSchemaCustomization: require('./create-types'),
  setFieldsOnGraphQLNodeType: require('./extend-types'),
  onCreateWebpackConfig: require('./webpack-config'),
}
