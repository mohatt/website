module.exports = {
  node: {
    createSchemaCustomization: require('./create-types'),
    setFieldsOnGraphQLNodeType: require('./extend-types'),
    onCreateWebpackConfig: args => {
      require('./webpack-bundle-analyzer')(args)
    },
  },
  ssr: {
    onRenderBody: args => {
      require('./setup-theme')(args)
    }
  }
}
