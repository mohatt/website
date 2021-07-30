const { deployment, contentPath, pages } = require('./config/site')
const { getYamlTypename } = require('./gatsby/types')
const { title } = require('./src/constants/site')

module.exports = {
  siteMetadata: {
    deployment,
    siteUrl: deployment.config.url, // for gatsby-plugin-sitemap
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: contentPath,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-advanced-pages',
      options: { pages },
    },
    {
      resolve: 'gatsby-transformer-yaml',
      options: { typeName: getYamlTypename },
    },
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          transformOptions: {
            cropFocus: 'center',
          },
          quality: 90,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: title,
        short_name: title,
        start_url: '/',
        background_color: '#234e52',
        theme_color: '#b28e59',
        display: 'standalone',
        icon: 'src/images/avatar/avatar.png',
        legacy: false,
      },
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: require('./config/postcss'),
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-preload-fonts',
    {
      resolve: 'gatsby-plugin-postbuild',
      options: require('./config/postbuild'),
    },
  ],
}

// dev-only plugins
if (deployment.is.local) {
  module.exports.plugins.push('gatsby-plugin-graphql-config')
}
