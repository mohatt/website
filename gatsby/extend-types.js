'use strict'

// Extend frontmatter type definition
module.exports = function ({ type }) {
  if (type.name === 'Mdx') {
    return {
      'frontmatter.slug': 'String',
      'frontmatter.skills': {
        type: `[SkillYaml]`,
        extensions: {
          link: {
            by: 'id'
          }
        }
      }
    }
  }

  return {}
}
