export interface SiteMenuSubItem {
  label: string
  // internal link
  to?: string
  params?: Record<string, string>
  hash?: string
  // external link
  href?: string
  linkId?: string
}

export type SiteMenuItem = SiteMenuSubItem & { items?: SiteMenuSubItem[] }

export const menu: SiteMenuItem[] = [
  { label: 'Intro', to: 'home' },
  {
    label: 'Projects',
    to: 'projects',
    items: [
      {
        label: 'Portfolio',
        to: 'projects.category',
        params: { category: 'portfolio' },
        hash: 'portfolio',
      },
      {
        label: 'Open Source',
        to: 'projects.category',
        params: { category: 'open-source' },
        hash: 'open-source',
      },
    ],
  },
  {
    label: 'Skills',
    to: 'skills',
    items: [
      { label: 'Backend', hash: 'backend' },
      { label: 'Frontend', hash: 'frontend' },
      { label: 'DevOps', hash: 'devops' },
      { label: 'Tools', hash: 'tools' },
    ],
  },
  {
    label: 'Résumé',
    to: 'resume',
    items: [
      { label: 'Experience', hash: 'experience' },
      { label: 'Skills', hash: 'skills' },
      { label: 'Education', hash: 'education' },
      { label: 'Testimonials', hash: 'testimonials' },
    ],
  },
  { label: 'Contact', href: 'mailto:mohatt@pm.me', linkId: 'menu_contact' },
]
