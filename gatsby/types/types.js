const {
  createParentFieldResolverProxy,
  createPlatformHandleResolver
} = require('./resolvers')

exports.definitions = [
  {
    name: 'Project',
    fields: {
      slug: 'String!',
      title: 'String!',
      excerpt: 'String!',
      draft: 'Boolean',
      started: {
        type: `Date!`,
        extensions: {
          dateformat: {},
        },
      },
      cover: {
        type: `File!`,
        extensions: {
          fileByRelativePath: {},
        }
      },
      hasCover: 'Boolean!',
      screens: {
        type: `[File]`,
        extensions: {
          fileByRelativePath: {},
        }
      },
      skills: {
        type: '[ProjectSkillYaml]',
        extensions: {
          link: {},
        },
      },
      categories: {
        type: '[ProjectCategoryYaml]',
        extensions: {
          link: {},
        },
      },
      handles: {
        type: '[PlatformHandle]',
        resolve: createPlatformHandleResolver()
      },
      body: {
        type: 'String',
        resolve: createParentFieldResolverProxy({ field: 'body' }),
      },
      priority: 'Int',
    },
    interfaces: ['Node'],
  },
  {
    name: 'ProjectSkillYaml',
    fields: {
      title: 'String!',
      icon: {
        type: 'String',
        resolve (source) {
          try {
            return require(`simple-icons/icons/${source.icon}.js`).path
          } catch (e) {
            return source.icon
          }
        },
      },
      tags: '[String!]',
      projects: {
        type: 'Int!',
        resolve (source, args, context) {
          return context.nodeModel
            .getAllNodes({ type: 'Project' })
            .filter(p => p.skills.find(s => s === source.id))
            .length
        },
      },
    },
    interfaces: ['Node'],
  },
  {
    name: 'ProjectCategoryYaml',
    fields: {
      title: 'String!',
      desc: 'String!',
      projects: {
        type: 'Int!',
        resolve (source, args, context) {
          return context.nodeModel
            .getAllNodes({ type: 'Project' })
            .filter(p => p.categories.find(s => s === source.id))
            .length
        },
      },
    },
    interfaces: ['Node'],
  },
  `
  type PlatformHandle {
    id: String!
    type: String!
    title: String!
    icon: String!
    href: String!
  }
  `
];

exports.extendTypes = {
  'Site': {
    'siteMetadata.contacts': {
      type: '[PlatformHandle]',
      resolve: createPlatformHandleResolver()
    }
  }
}

exports.namespaceTypeMap = {
  project: {
    mdx: 'Project'
  }
}
