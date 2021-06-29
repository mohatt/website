const path = require('path')
const env = require('./environment')

module.exports = {
  contentPath: path.join(__dirname, '../content'),
  metadata: {
    title: 'Mohamed E.',
    url: env.config.url,
    description: 'Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu.',
    copyright: '© 2021 All rights reserved.',
    menu: [
      { label: 'Intro', to: 'home' },
      { label: 'Skills', to: 'skills' },
      { label: 'Projects', to: 'projects' },
      { label: 'Clients', to: '/clients' },
      { label: 'Contact', to: '/contact' },
    ],
    contacts: [
      { type: 'email', to: 'mohatt@pm.me' },
      { type: 'twitter', to: '#' },
      { type: 'github', to: 'mohatt' },
    ],
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
