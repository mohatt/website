import type { FirebaseOptions } from 'firebase/app'
import type { NetworkHandleId } from '@/util'

export const site = {
  title: process.env.GATSBY_SITE_TITLE,
  description: process.env.GATSBY_SITE_DESCRIPTION,
  deployment: {
    env: process.env.GATSBY_DEPLOY_ENV,
    target: process.env.GATSBY_DEPLOY_TARGET,
    url: process.env.GATSBY_DEPLOY_URL,
    channel: process.env.GATSBY_DEPLOY_CHANNEL,
    sha: process.env.GATSBY_DEPLOY_SHA,
    date: new Date(process.env.GATSBY_DEPLOY_DATE),
    ga4: process.env.GATSBY_GA4_ID,
    firebase: JSON.parse(process.env.GATSBY_FIREBASE_CONFIG) as FirebaseOptions,
    admins: ['mkh117@gmail.com'],
  },
  phone: '+971501761107',
  location: 'Dubai, UAE (UTC+4)',
  contacts: Array<NetworkHandleId>('github:mohatt', 'linkedin:mohatt', 'email:mohatt@pm.me'),
  themeStorageKey: 'mohatt:theme',
  repository: 'https://github.com/mohatt/website',
  copyright: '© 2025 All rights reserved.',
}
