import type { GatsbyConfig } from 'gatsby'
import site from './config/site'
import postcss from './config/postcss'
import postbuild from './config/postbuild'
import { getYamlTypename } from './gatsby/types'

const config: GatsbyConfig = {
  siteMetadata: site.metadata,
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
        gatsbyRemarkPlugins: ['gatsby-remark-smartypants'],
      },
    },
    {
      resolve: 'gatsby-plugin-advanced-pages',
      options: { pages: site.pages },
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
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        // When enabled, type-only class fields are only removed if they are prefixed with the declare modifier.
        allowDeclareFields: true,
      },
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postcssOptions: postcss,
      },
    },
    'gatsby-plugin-react-helmet-async',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-preload-fonts',
    {
      resolve: 'gatsby-plugin-postbuild',
      options: postbuild,
    },
  ],
  graphqlTypegen: {
    typesOutputPath: 'gatsby-types.d.ts',
  },
  jsxRuntime: 'automatic',
}

export default config
