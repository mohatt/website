import type { IUserOptions } from 'gatsby-plugin-postbuild'
import deployment from './deployment'

const options: IUserOptions = {
  enabled: true,
  reporting: false,
  ignore: ['webpack.report.html', 'google7a76cf0ab3da37d0.html'],
  'http-headers': {
    enabled: true,
    provider: 'firebase',
    headers: {
      '[*]':
        deployment.target !== 'production' || deployment.channel !== 'live'
          ? { 'X-Robots-Tag': 'noindex' }
          : {},
      '[pages]': {
        link: [
          '<https://www.googletagmanager.com>; rel=preconnect',
          '<https://www.google-analytics.com>; rel=preconnect',
        ],
      },
    },
  },
  minify: {
    enabled: true,
    style: [
      'default',
      {
        discardComments: {
          remove: (comment: string) => {
            return comment !== '!'
          },
        },
      },
    ],
  },
}

export default options
