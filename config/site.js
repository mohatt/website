module.exports = {
  title: 'Mohatt',
  url: 'https://mo.tru.io',
  description: 'Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu.',
  copyright: '© 2021 All rights reserved.',
  projectsPageSize: 4,
  googleAnalyticsId: 'UA-73379983-2',
  menu: [
    { label: 'Intro', to: 'home' },
    { label: 'Skills', to: 'skills' },
    { label: 'Portafolio', to: 'portafolio' },
    { label: 'Clients', to: '/clients' },
    { label: 'Contact', to: '/contact' },
  ],
  author: {
    name: 'Mohamed Elkholy',
    screenName: 'Mohatt',
    contacts: {
      email: '#',
      twitter: '#',
      github: '#',
    },
  },
  pages: [
    {
      title: 'Hi',
      routes: {
        home: '/'
      },
      template: 'home.js'
    },
    {
      title: 'Skills',
      routes: {
        skills: '/skills'
      },
      template: 'skills.js'
    },
    {
      title: 'Portafolio',
      routes: {
        portafolio: '/portafolio',
        'portafolio.skill': '/portafolio/skill/:skill',
        'portafolio.category': '/portafolio/category/:category',
      },
      helper: 'portafolio.js',
      template: 'portafolio.js',
    },
    {
      title: 'Project',
      routes: {
        'portafolio.project': '/portafolio/:project'
      },
      helper: 'portafolio.js',
      template: 'project.js',
    },
    {
      title: '404: Not found',
      routes: {
        'error.404': '/404'
      },
      template: 'error.js',
      data: {
        message: "You just hit a route that doesn't exist."
      },
    },
  ],
}
