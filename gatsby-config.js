const path = require('path')
const site = require('./config/site')

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
        trackingIds: [site.ga],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: site.metadata.title,
        short_name: site.metadata.title,
        start_url: '/',
        background_color: '#234e52',
        theme_color: '#b28e59',
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
    `gatsby-plugin-robots-txt`,
    'gatsby-plugin-catch-links',
    `gatsby-plugin-preload-fonts`,
    {
      resolve: 'gatsby-plugin-postbuild',
      options: require('./config/postbuild'),
    },
  ],
}
