const _ = require('lodash')
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
        },
      },
      hasImage: 'Boolean!',
      screens: {
        type: '[File]',
        extensions: {
          fileByRelativePath: {},
        },
      },
      skills: {
        type: '[ProjectSkill]',
        extensions: {
          link: {
            by: 'slug',
          },
        },
      },
      categories: {
        type: '[ProjectCategory]',
        extensions: {
          link: {
            by: 'slug',
          },
        },
      },
      testimonials: {
        type: '[Testimonial]',
        async resolve(source, args, context) {
          const { entries } = await context.nodeModel.findAll({ type: 'Testimonial' })
          return [...entries].filter((t) => t.project === source.slug).sort((x, y) => 0)
        },
      },
      handles: '[String]',
      // This field is not currently being used anywhere
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
        resolve(source) {
          if (source.icon.length >= 32) {
            return source.icon
          }
          const icons = require('simple-icons')
          const icon = icons[`si${_.upperFirst(source.icon)}`]
          return icon?.path ?? source.icon
        },
      },
      tags: '[String!]',
      size: {
        type: 'Int!',
        async resolve(source, args, context) {
          const { entries } = await context.nodeModel.findAll({ type: 'Project' })
          return [...entries].filter((p) => p.skills.find((s) => s === source.slug)).length
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
        async resolve(source, args, context) {
          const { entries } = await context.nodeModel.findAll({ type: 'Project' })
          return [...entries].filter((p) => p.categories.find((s) => s === source.slug)).length
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
        },
      },
      handles: '[String]',
      project: {
        type: 'Project',
        extensions: {
          link: {
            by: 'slug',
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
