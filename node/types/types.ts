import type { Node } from 'gatsby'
import type { GraphQLFieldConfigMap } from 'graphql'
import type { ObjectTypeComposerAsObjectDefinition } from 'graphql-compose'
import { createResolver, createParentFieldResolverProxy, createSimpleIconsResolver } from './util'

export const create: Array<ObjectTypeComposerAsObjectDefinition<Node, unknown>> = [
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
      icon: {
        type: 'String',
        resolve: createSimpleIconsResolver(),
      },
      iconText: 'String',
      iconSize: 'Int',
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
        resolve: createResolver(async (source, args, context) => {
          const { entries } = await context.nodeModel.findAll({ type: 'Testimonial' })
          return [...entries].filter((t) => t.project === source.slug)
        }),
      },
      handles: '[String]',
      // This field is not currently being used anywhere
      body: {
        type: 'String',
        resolve: createParentFieldResolverProxy('body'),
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
        resolve: createSimpleIconsResolver(),
      },
      tags: '[String!]',
      size: {
        type: 'Int!',
        resolve: createResolver(async (source, args, context) => {
          const { entries } = await context.nodeModel.findAll({ type: 'Project' })
          return [...entries].filter((p) => p.skills.find((s) => s === source.slug)).length
        }),
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
        resolve: createResolver(async (source, args, context) => {
          const { entries } = await context.nodeModel.findAll({ type: 'Project' })
          return [...entries].filter((p) => p.categories.find((s) => s === source.slug)).length
        }),
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

export interface TypeExtensions {
  [type: string]: GraphQLFieldConfigMap<Node, unknown>
}

export const extend: TypeExtensions = {}

export interface ContentNamespaceTypes {
  mdx?: string
  yaml?:
    | string
    | {
        [filename: string]: string
      }
}

export interface ContentNamespace {
  [directory: string]: ContentNamespaceTypes
}

export const namespaces: ContentNamespace = {
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

export const defaults = {
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
