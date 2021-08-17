export const networkHandles = {
  phone: {
    title: 'Phone',
    icon: 'phone',
    href: 'tel:%s',
  },
  email: {
    title: 'Email',
    icon: 'email',
    href: 'mailto:%s',
  },
  homepage: {
    title: 'Homepage',
    icon: 'globe',
    href: handle => /^(https?:)?\/\//.test(handle) ? handle : `https://${handle}`,
  },
  github: {
    title: 'Github Profile',
    icon: 'github',
    href: 'https://github.com/%s',
  },
  githubRepo: {
    title: 'Github Repository',
    icon: 'github',
    href: 'https://github.com/%s',
  },
  twitter: {
    title: 'Twitter Profile',
    icon: 'twitter',
    href: 'https://twitter.com/%s',
  },
  linkedin: {
    title: 'Linkedin Profile',
    icon: 'linkedin',
    href: 'https://linkedin.com/in/%s',
  },
  npm: {
    title: 'NPM Package',
    icon: 'npm',
    href: 'https://npmjs.com/package/%s',
  },
  stackoverflow: {
    title: 'Stack Overflow Profile',
    icon: 'stackoverflow',
    href: 'https://stackoverflow.com/users/%s',
  },
  packagist: {
    title: 'Composer Package',
    icon: 'packagist',
    href: 'https://packagist.org/packages/%s',
  },
}
