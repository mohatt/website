'use strict'

// Extend frontmatter type definition
module.exports = function ({ type }) {
  if (type.name === 'Mdx') {
    return {
      'frontmatter.type': 'String',
      'frontmatter.slug': 'String',
      'frontmatter.projectSkills': {
        type: `[ProjectSkillYaml]`,
        extensions: {
          link: {
            by: 'id',
          },
        },
      },
      'frontmatter.projectCategories': {
        type: `[ProjectCategoryYaml]`,
        extensions: {
          link: {
            by: 'id',
          },
        },
      },
    }
  }

  return {}
}
