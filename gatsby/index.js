module.exports = {
  node: {
    createSchemaCustomization: require('./create-types'),
    setFieldsOnGraphQLNodeType: require('./extend-types'),
    onCreateWebpackConfig: args => {
      require('./webpack-bundle-analyzer')(args)
    },
    // This is temporary
    onPostBuild: () => {
      require('fs').copyFileSync(`./firebase.json`, `./public/firebase.json`)
    }
  },
  ssr: {
    onRenderBody: args => {
      require('./setup-theme')(args)
    }
  }
}
