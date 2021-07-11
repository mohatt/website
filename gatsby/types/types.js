const { createParentFieldResolverProxy } = require('./resolvers')

exports.create = [
  {
    name: 'Project',
    fields: {
      slug: 'String!',
      title: 'String!',
      desc: 'String!',
      draft: 'Boolean',
      started: {
        type: 'Date!',
        extensions: {
          dateformat: {},
        },
      },
      image: {
        type: 'File!',
        extensions: {
          fileByRelativePath: {},
        }
      },
      hasImage: 'Boolean!',
      screens: {
        type: '[File]',
        extensions: {
          fileByRelativePath: {},
        }
      },
      skills: {
        type: '[ProjectSkill]',
        extensions: {
          link: {},
        },
      },
      categories: {
        type: '[ProjectCategory]',
        extensions: {
          link: {},
        },
      },
      handles: '[String]',
      body: {
        type: 'String',
        resolve: createParentFieldResolverProxy({ field: 'body' }),
      },
      status: 'String',
      priority: 'Int',
    },
    interfaces: ['Node'],
  },
  {
    name: 'ProjectSkill',
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
      size: {
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
    name: 'ProjectCategory',
    fields: {
      title: 'String!',
      desc: 'String!',
      size: {
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
];

exports.extend = {
  Site: {
    'siteMetadata.menu': 'JSON!',
  },
}

exports.namespaces = {
  project: {
    mdx: 'Project',
    yaml: {
      'categories.yaml': 'ProjectCategory',
      'skills.yaml': 'ProjectSkill',
    },
  },
}

exports.defaults = {
  Project: {
    draft: false,
    screens: [],
    categories: [],
    skills: [],
    handles: [],
  },
  ProjectSkill: {
    tags: [],
  },
  Testimonial: {
    handles: [],
  },
}
