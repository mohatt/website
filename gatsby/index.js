module.exports = {
  node: {
    createSchemaCustomization: require('./create-types'),
    setFieldsOnGraphQLNodeType: require('./extend-types'),
    onCreateWebpackConfig: require('./webpack-config'),
  },
  ssr: {
    onRenderBody: args => {
      require('./setup-theme')(args)
    }
  }
}
