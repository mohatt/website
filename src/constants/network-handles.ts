import type { IconProps } from '@/components/Icon'

export interface NetworkHandleDefinition {
  readonly title: string
  readonly icon: IconProps['name']
  readonly href: string | ((handle: string) => string)
}

export type NetworkHandleType = keyof typeof networkHandles

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
    href: (handle: string) => (/^(https?:)?\/\//.test(handle) ? handle : `https://${handle}`),
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
  x: {
    title: 'X (formerly Twitter) Profile',
    icon: 'x',
    href: 'https://x.com/%s',
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
} as const satisfies Record<string, NetworkHandleDefinition>
