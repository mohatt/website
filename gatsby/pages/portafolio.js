const { kebabCase } = require('lodash')
const { projectsPageSize } = require('../../config')

async function createPortafolioPages ({ graphql, page, createAdvancedPage }) {
  const result = await graphql(`
    {
      projects: allMdx(
        filter: { frontmatter: { type: { eq: "project" }, draft: { ne: true } } }
      ) {
        totalCount
        group(field: frontmatter___skills___id) {
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
      limit: projectsPageSize
    },
    filter: {
      frontmatter: {
        type: { eq: 'project' },
        draft: { ne: true }
      }
    }
  })

  // Pagination for skill-filtered views
  for (const skill of result.data.projects.group) {
    createAdvancedPage({
      route: 'portafolio.skill',
      params: {
        skill: skill.fieldValue
      },
      pagination: {
        count: skill.totalCount,
        limit: projectsPageSize
      },
      filter: {
        frontmatter: {
          type: { eq: 'project' },
          skills: {
            elemMatch: {
              id: { eq: skill.fieldValue }
            }
          },
          draft: { ne: true }
        }
      }
    })
  }
}

async function createProjectPages ({ graphql, page, createAdvancedPage }) {
  const result = await graphql(`
    {
      projects: allMdx(
        filter: { frontmatter: { type: { eq: "project" }, draft: { ne: true } } }
      ) {
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

  return result.data.projects.edges.map(({ node }) => {
    const slug = node.frontmatter.slug || kebabCase(node.frontmatter.title)
    createAdvancedPage({
      route: 'portafolio.project',
      params: { project: slug }
    })
  })
}

module.exports = async args => {
  switch (args.page.template) {
    case 'portafolio':
      await createPortafolioPages(args)
      break
    case 'project':
      await createProjectPages(args)
      break
    default:
      // Unrecognized page template
  }
}
