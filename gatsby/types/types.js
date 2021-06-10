const { createParentResolverPassthroughResolver } = require('./resolvers')

exports.definitions = [
  {
    name: 'Project',
    fields: {
      title: 'String!',
      date: {
        type: `Date!`,
        extensions: {
          dateformat: {},
        }
      },
      excerpt: 'String!',
      slug: 'String',
      draft: 'Boolean',
      image: {
        type: `File`,
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
      body: {
        type: 'String',
        resolve: createParentResolverPassthroughResolver({ field: 'body' }),
      },
    },
    interfaces: ['Node'],
  },
  {
    name: 'ProjectSkillYaml',
    fields: {
      title: 'String!',
      icon: {
        type: 'String',
        resolve: source => {
          try {
            return require('simple-icons/icons/' + source.icon).path
          } catch (e) {
            return source.icon
          }
        },
      },
      tags: '[String!]',
      projects: {
        type: 'Int!',
        resolve: (source, args, context) => context.nodeModel
          .getAllNodes({ type: 'Project' })
          .filter(p => p.skills.find(s => s === source.id))
          .length,
      },
    },
    interfaces: ['Node'],
  },
  {
    name: 'ProjectCategoryYaml',
    fields: {
      title: 'String!',
      projects: {
        type: 'Int!',
        resolve: (source, args, context) => context.nodeModel
          .getAllNodes({ type: 'Project' })
          .filter(p => p.categories.find(c => c === source.id))
          .length,
      },
    },
    interfaces: ['Node'],
  }
];

exports.namespaceTypeMap = {
  project: {
    mdx: 'Project'
  }
}
