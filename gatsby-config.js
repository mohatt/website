const env = require('./config/environment')
const site = require('./config/site')
const { getYamlTypename } = require('./gatsby/types')
const { colors } = require('./src/providers/theme/themes').defaultState.color

module.exports = {
  siteMetadata: {
    ...site.metadata,
    siteUrl: site.metadata.url, // for gatsby-plugin-sitemap
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: site.contentPath,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: { maxWidth: 960 },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-advanced-pages',
      options: {
        pages: site.pages,
      },
    },
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        typeName: getYamlTypename,
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          transformOptions: {
            cropFocus: 'center'
          },
          quality: 90
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: site.metadata.title,
        short_name: site.metadata.title,
        start_url: '/',
        background_color: colors.secondary,
        theme_color: colors.primary,
        display: 'standalone',
        icon: 'src/images/avatar/avatar.png',
        legacy: false,
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-postcss',
      options: require('./config/postcss'),
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-preload-fonts',
    {
      resolve: 'gatsby-plugin-postbuild',
      options: require('./config/postbuild'),
    },
  ],
}

// Development plugins
if (env.isDevelopment()) {
  module.exports.plugins.push('gatsby-plugin-graphql-config')
}
