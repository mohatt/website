'use strict'

module.exports = ({ actions, schema }) => {
  const { createTypes } = actions

  const typeDefs = `
    type SkillCategoryYaml implements Node {
      title: String!
      skills: [SkillYaml] @link(by: "category.id", from: "id")
    }

    type SkillYaml implements Node {
      title: String!
      exp: Int!
      icon: String
      category: SkillCategoryYaml @link
      projects: [Mdx] @link(by: "frontmatter.skills.id", from: "id")
    }
  `

  createTypes(typeDefs)
}
