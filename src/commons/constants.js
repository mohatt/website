export const SOCIAL_HANDLES = {
  email: {
    title: 'Email',
    icon: 'email',
    href: handle => `mailto:${handle}`,
  },
  github: {
    title: 'Github',
    icon: 'github',
    href: handle => `https://github.com/${handle}`,
  },
  twitter: {
    title: 'Twitter',
    icon: 'twitter',
    href: handle => `https://www.twitter.com/${handle}`,
  },
}
