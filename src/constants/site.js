exports.site = {
  title: 'Mohamed Elkholy',
  description:
    'Full-stack web developer with a broad range of skills and expertise in most web development related fields.',
  copyright: '© 2021 All rights reserved.',
  menu: [
    { label: 'Intro', to: 'home' },
    { label: 'Skills', to: 'skills', items: [
      { label: 'Backend', hash: 'backend' },
      { label: 'Frontend', hash: 'frontend' },
      { label: 'DevOps', hash: 'devops' },
      { label: 'Software', hash: 'software' },
    ]},
    { label: 'Projects', to: 'projects', items: [
      { label: 'OpenSource', to: 'projects.category', params: { category: 'open-source' }, hash: 'open-source' },
      { label: 'Portfolio', to: 'projects.category', params: { category: 'portfolio' }, hash: 'portfolio' },
    ]},
    { label: 'Resumé', to: 'resume', items: [
      { label: 'Experience', hash: 'experience' },
      { label: 'Skills', hash: 'skills' },
      { label: 'Testimonials', hash: 'testimonials' },
    ]},
    { label: 'Contact', to: 'mailto:mohatt@pm.me', external: 'menu_contact' },
  ],
  contacts: [
    'github:mohatt',
    'linkedin:mdkholy',
    'email:mohatt@pm.me',
  ],
  themeStorageKey: 'mohatt:theme',
}
