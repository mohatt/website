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
      testimonials: {
        type: '[Testimonial]',
        resolve (source, args, context) {
          return context.nodeModel
            .getAllNodes({ type: 'Testimonial' })
            .filter(t => t.project === source.slug)
            .sort((x, y) => 0)
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
          if (source.icon.length >= 64) {
            return source.icon
          }
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
  {
    name: 'Testimonial',
    fields: {
      name: 'String!',
      title: 'String!',
      quote: 'String!',
      received: {
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
      handles: '[String]',
      project: {
        type: 'Project',
        extensions: {
          link: {
            by: 'slug'
          },
        },
      },
      priority: 'Int',
    },
    interfaces: ['Node'],
  },
]

exports.extend = {}

exports.namespaces = {
  project: {
    mdx: 'Project',
    yaml: {
      'categories.yaml': 'ProjectCategory',
      'skills.yaml': 'ProjectSkill',
    },
  },
  testimonial: {
    yaml: 'Testimonial',
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
