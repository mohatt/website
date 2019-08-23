'use strict'

module.exports = {
  site: {
    siteMetadata: {
      url: 'http://localhost',
      title: 'Test title',
      description: 'Test subtitle',
      copyright: 'Test copyright',
      projectsPageSize: 4,
      menu: [
        {
          label: 'Test label 1',
          route: 'test1'
        },
        {
          label: 'Test label 2',
          route: 'test2'
        },
        {
          label: 'Test label 3',
          route: 'test3'
        }
      ],
      author: {
        name: 'Test name',
        screenName: 'test',
        contacts: {
          email: '#',
          twitter: '#',
          github: '#'
        }
      }
    }
  }
}
