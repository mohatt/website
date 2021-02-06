'use strict'

module.exports = ({ actions, schema }) => {
  const { createTypes } = actions

  const typeDefs = [
    schema.buildObjectType({
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
        categories: '[String!]',
        projects: {
          type: 'Int!',
          resolve: (source, args, context) => {
            return context.nodeModel
              .getAllNodes({ type: 'Mdx' })
              .filter(
                mdx =>
                  mdx.frontmatter.projectSkills &&
                  mdx.frontmatter.projectSkills.find(s => s === source.id)
              ).length
          },
        },
      },
      interfaces: ['Node'],
    }),
    schema.buildObjectType({
      name: 'ProjectCategoryYaml',
      fields: {
        title: 'String!',
        projects: {
          type: 'Int!',
          resolve: (source, args, context) => {
            return context.nodeModel
              .getAllNodes({ type: 'Mdx' })
              .filter(
                mdx =>
                  mdx.frontmatter.projectCategories &&
                  mdx.frontmatter.projectCategories.find(c => c === source.id)
              ).length
          },
        },
      },
      interfaces: ['Node'],
    }),
  ]

  createTypes(typeDefs)
}
