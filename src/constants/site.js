exports.site = {
  title: 'Mohamed Elkholy',
  description: 'Full-stack web developer with years of hands-on experience across front-end, back-end, and cloud infrastructure.',
  copyright: '© 2025 All rights reserved.',
  menu: [
    { label: 'Intro', to: 'home' },
    { label: 'Skills', to: 'skills', items: [
      { label: 'Backend', hash: 'backend' },
      { label: 'Frontend', hash: 'frontend' },
      { label: 'DevOps', hash: 'devops' },
      { label: 'Tools', hash: 'software' },
    ]},
    { label: 'Projects', to: 'projects', items: [
      { label: 'Portfolio', to: 'projects.category', params: { category: 'portfolio' }, hash: 'portfolio' },
      { label: 'OpenSource', to: 'projects.category', params: { category: 'open-source' }, hash: 'open-source' },
    ]},
    { label: 'Resumé', to: 'resume', items: [
      { label: 'Experience', hash: 'experience' },
      { label: 'Skills', hash: 'skills' },
      { label: 'Education', hash: 'education' },
      { label: 'Testimonials', hash: 'testimonials' },
    ]},
    { label: 'Contact', to: 'mailto:mohatt@pm.me', external: 'menu_contact' },
  ],
  phone: '+201553720847',
  contacts: [
    'github:mohatt',
    'linkedin:mohatt',
    'email:mohatt@pm.me',
  ],
  themeStorageKey: 'mohatt:theme',
}
