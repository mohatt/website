const { kebabCase } = require('lodash')
const limit = require('../../config').site.pagination.portafolio

async function createPortafolioPages({ graphql, createAdvancedPage }) {
  const result = await graphql(`
    {
      projects: allMdx(filter: { frontmatter: { type: { eq: "project" }, draft: { ne: true } } }) {
        totalCount
        skills: group(field: frontmatter___projectSkills___id) {
          fieldValue
          totalCount
        }
        categories: group(field: frontmatter___projectCategories___id) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  // Default pagination
  createAdvancedPage({
    route: 'portafolio',
    pagination: {
      count: result.data.projects.totalCount,
      limit,
    },
    filter: {
      frontmatter: {
        type: { eq: 'project' },
        draft: { ne: true },
      },
    },
  })

  // Pagination for skill-filtered views
  for (const skill of result.data.projects.skills) {
    // noinspection JSDeprecatedSymbols
    createAdvancedPage({
      route: 'portafolio.skill',
      params: {
        skill: skill.fieldValue,
      },
      pagination: {
        count: skill.totalCount,
        limit,
      },
      filter: {
        frontmatter: {
          type: { eq: 'project' },
          projectSkills: {
            elemMatch: {
              id: { eq: skill.fieldValue },
            },
          },
          draft: { ne: true },
        },
      },
    })
  }

  // Pagination for category-filtered views
  for (const category of result.data.projects.categories) {
    // noinspection JSDeprecatedSymbols
    createAdvancedPage({
      route: 'portafolio.category',
      params: {
        category: category.fieldValue,
      },
      pagination: {
        count: category.totalCount,
        limit,
      },
      filter: {
        frontmatter: {
          type: { eq: 'project' },
          projectCategories: {
            elemMatch: {
              id: { eq: category.fieldValue },
            },
          },
          draft: { ne: true },
        },
      },
    })
  }
}

async function createProjectPages({ graphql, createAdvancedPage }) {
  const result = await graphql(`
    {
      projects: allMdx(filter: { frontmatter: { type: { eq: "project" }, draft: { ne: true } } }) {
        edges {
          node {
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  result.data.projects.edges.map(({ node }) => {
    const slug = node.frontmatter.slug || kebabCase(node.frontmatter.title)
    return createAdvancedPage({
      route: 'portafolio.project',
      params: {
        project: slug,
      },
    })
  })
}

module.exports = async args => {
  switch (args.page.templateName) {
    case 'portafolio.js':
      await createPortafolioPages(args)
      break
    case 'project.js':
      await createProjectPages(args)
      break
    default:
    // Unrecognized page template
  }
}
