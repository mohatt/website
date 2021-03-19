const path = require('path')
const site = require('./config/site')
const postCssPlugins = require('./config/postcss')

module.exports = {
  siteMetadata: {
    siteUrl: site.url,
    url: site.url,
    title: site.title,
    description: site.description,
    copyright: site.copyright,
    menu: site.menu,
    author: site.author,
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
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
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
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [site.googleAnalyticsId],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: site.title,
        short_name: site.title,
        start_url: '/',
        background_color: '#234e52',
        theme_color: '#b28e59',
        display: 'standalone',
        icon: 'src/assets/img/avatar/avatar.png',
        legacy: false,
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [...postCssPlugins],
        cssLoaderOptions: {
          camelCase: false,
        },
      },
    },
    'gatsby-plugin-sitemap',
    `gatsby-plugin-robots-txt`,
    'gatsby-plugin-catch-links',
    `gatsby-plugin-preload-fonts`,
    {
      resolve: 'gatsby-plugin-postbuild',
      options: {
        purgecss: {
          enabled: true,
          allowSymbols: true,
        },
        'netlify-headers': {
          enabled: true
        }
      },
    },
  ],
}
