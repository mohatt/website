module.exports = {
  node: {
    createSchemaCustomization: require('./create-types'),
    setFieldsOnGraphQLNodeType: require('./extend-types'),
    onCreateWebpackConfig: args => {
      require('./webpack-definitions')(args)
      require('./webpack-bundle-analyzer')(args)
    }
  },
  ssr: {
    onRenderBody: args => {
      require('./setup-firebase')(args)
      require('./setup-theme')(args)
    }
  }
}
