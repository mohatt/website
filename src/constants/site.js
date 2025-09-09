exports.site = {
  title: 'Mohamed Elkholy',
  description:
    'Full-stack software engineer with years of hands-on experience across front-end, back-end, and cloud infrastructure.',
  copyright: '© 2025 All rights reserved.',
  menu: [
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
  ],
  phone: '+971501761107',
  location: 'Dubai, UAE (UTC+4)',
  contacts: ['github:mohatt', 'linkedin:mohatt', 'email:mohatt@pm.me'],
  themeStorageKey: 'mohatt:theme',
}
