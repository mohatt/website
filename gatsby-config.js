const path = require('path')
const env = require('./config/environment')
const site = require('./config/site')
const theme = require('./src/commons/themes').THEME_DEFAULT

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
        path: path.join(__dirname, 'content'),
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
    'gatsby-transformer-yaml',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: site.metadata.title,
        short_name: site.metadata.title,
        start_url: '/',
        background_color: theme.colors.secondary,
        theme_color: theme.colors.primary,
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
