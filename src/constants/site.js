exports.site = {
  title: 'Mohamed Elkholy',
  description: 'Full stack web developer with a broad range of skills and expertise in all web development related fields.',
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
      { label: 'Education', hash: 'education' },
      { label: 'Projects', hash: 'projects' },
      { label: 'References', hash: 'references' },
    ]},
    { label: 'Contact', to: 'mailto:mohatt@pm.me', external: 'menu_contact' },
  ],
  phone: '+201553720847',
  contacts: [
    'github:mohatt',
    'stackoverflow:621543',
    'linkedin:mohatt',
    'email:mohatt@pm.me',
  ],
  themeStorageKey: 'mohatt:theme',
}
