const path = require('path')
const env = require('./environment')

module.exports = {
  contentPath: path.join(__dirname, '../content'),
  metadata: {
    title: 'Mohamed Elkholy',
    titleShort: 'Mohatt',
    url: env.config.url,
    description: 'Full-stack web developer with a broad range of skills and expertise in most web development related fields.',
    copyright: '© 2021 All rights reserved.',
    menu: [
      { label: 'Intro', to: 'home' },
      { label: 'Skills', to: 'skills', items: [
        { hash: 'backend', label: 'Backend' },
        { hash: 'frontend', label: 'Frontend' },
        { hash: 'devops', label: 'DevOps' },
        { hash: 'software', label: 'Software' },
      ]},
      { label: 'Projects', to: 'projects', items: [
          { label: 'OpenSource', to: 'projects.category', params: { category: 'open-source' }, hash: 'open-source' },
          { label: 'Portafolio', to: 'projects.category', params: { category: 'portafolio' }, hash: 'portafolio' },
      ]},
      { label: 'Clients', to: '/clients' },
      { label: 'Contact', to: '/contact' },
    ],
    contacts: [
      'github:mohatt',
      'linkedin:mdkholy',
      'email:mohatt@pm.me',
    ]
  },
  pagination: {
    projectsIndex: 6,
    projectsList: 12,
  },
  pages: [
    {
      title: 'Hi',
      routes: {
        home: '/'
      },
      template: 'Index.js'
    },
    {
      title: 'Skills',
      routes: {
        skills: '/skills'
      },
      template: 'Skills.js'
    },
    {
      title: 'Projects',
      routes: {
        projects: '/projects',
      },
      helper: 'projects.js',
      template: 'ProjectsIndex.js',
    },
    {
      title: 'Projects By Category',
      routes: {
        'projects.category': '/projects/category/:category',
      },
      helper: 'projects.js',
      template: 'ProjectsByCategory.js',
    },
    {
      title: 'Projects By Skill',
      routes: {
        'projects.skill': '/projects/skill/:skill',
      },
      helper: 'projects.js',
      template: 'ProjectsBySkill.js',
    },
    {
      title: 'Project Details',
      routes: {
        'projects.project': '/projects/:project'
      },
      helper: 'projects.js',
      template: 'Project.js',
    },
    {
      title: '404: Not found',
      routes: {
        'error.404': '/404'
      },
      template: 'Error.js',
      data: {
        code: 404,
        message: "You just hit a route that doesn't exist."
      },
    },
  ],
}
