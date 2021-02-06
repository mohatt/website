const path = require('path')
const site = require('./config/site')
const postCssPlugins = require('./config/postcss')

module.exports = {
  siteMetadata: {
    url: site.url,
    title: site.title,
    description: site.description,
    copyright: site.copyright,
    menu: site.menu,
    author: site.author,
  },
  plugins: [
    'gatsby-plugin-pnpm',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: path.join(__dirname, 'content'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'media',
        path: path.join(__dirname, 'static', 'media'),
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
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl: url
              }
            }
            allSitePage(
              filter: {
                path: { regex: "/^(?!/404/|/404.html|/dev-404-page/)/" }
              }
            ) {
              edges {
                node {
                  path
                }
              }
            }
          }
        `,
        output: '/sitemap.xml',
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => ({
            url: site.siteMetadata.siteUrl + edge.node.path,
            changefreq: 'daily',
            priority: 0.7,
          })),
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: site.title,
        short_name: site.title,
        start_url: '/',
        background_color: '#FFF',
        theme_color: '#F7A046',
        display: 'standalone',
        icon: 'static/media/avatar/avatar.png',
      },
    },
    'gatsby-plugin-catch-links',
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
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        tailwind: true,
        purgeOnly: ['src/assets/css/main.css'],
      },
    },
  ],
}
