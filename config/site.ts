import path from 'path'
import deployment from './deployment'

const site = {
  metadata: {
    title: 'Mohamed Elkholy',
    description:
      'Full-stack software engineer with years of hands-on experience across front-end, back-end, and cloud infrastructure.',
    siteUrl: deployment.config.url, // for gatsby-plugin-sitemap
  },
  contentPath: path.join(__dirname, '../content'),
  pages: [
    {
      title: 'Hi',
      routes: {
        home: '/',
      },
      template: 'Index.tsx',
    },
    {
      title: 'Skills',
      routes: {
        skills: '/skills',
      },
      template: 'Skills.tsx',
    },
    {
      title: 'Projects',
      routes: {
        projects: '/projects',
      },
      helper: 'projects.js',
      template: 'ProjectsIndex.tsx',
    },
    {
      title: 'Projects By Category',
      routes: {
        'projects.category': '/projects/category/:category',
      },
      helper: 'projects.js',
      template: 'ProjectsByCategory.tsx',
    },
    {
      title: 'Projects By Skill',
      routes: {
        'projects.skill': '/projects/skill/:skill',
      },
      helper: 'projects.js',
      template: 'ProjectsBySkill.tsx',
    },
    {
      title: 'Project Details',
      routes: {
        'projects.project': '/projects/:project',
      },
      helper: 'projects.js',
      template: 'Project.tsx',
    },
    {
      title: 'Résumé',
      routes: {
        resume: '/resume',
      },
      template: 'Resume.tsx',
    },
    {
      title: '404: Not found',
      routes: {
        'error.404': '/404',
      },
      template: 'Error.tsx',
      data: {
        code: 404,
        message: "You just hit a route that doesn't exist.",
      },
    },
    {
      title: 'Dashboard',
      routes: {
        dashboard: '/dashboard',
      },
      template: 'Dashboard.tsx',
    },
  ],
}

// Write environment variables to process.env so they can be accessed in the client
process.env.GATSBY_SITE_TITLE = site.metadata.title
process.env.GATSBY_SITE_DESCRIPTION = site.metadata.description

export default site
