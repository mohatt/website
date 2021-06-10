const limit = require('../../config/site').pagination.portafolio

async function createPortafolioPages({ graphql, createAdvancedPage }) {
  const result = await graphql(`
    {
      allProject(filter: { draft: { ne: true } }) {
        totalCount
        skills: group(field: skills___id) {
          fieldValue
          totalCount
        }
        categories: group(field: categories___id) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const projects = result.data.allProject

  // Default pagination
  createAdvancedPage({
    route: 'portafolio',
    pagination: {
      count: projects.totalCount,
      limit,
    },
    filter: {
      draft: { ne: true },
    },
  })

  // Pagination for skill-filtered views
  for (const skill of projects.skills) {
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
        skills: {
          elemMatch: {
            id: { eq: skill.fieldValue },
          },
        },
        draft: { ne: true },
      },
    })
  }

  // Pagination for category-filtered views
  for (const category of projects.categories) {
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
        categories: {
          elemMatch: {
            id: { eq: category.fieldValue },
          },
        },
        draft: { ne: true },
      },
    })
  }
}

async function createProjectPages({ graphql, createAdvancedPage }) {
  const result = await graphql(`
    {
      allProject(filter: { draft: { ne: true } }) {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  result.data.allProject.edges.map(({ node }) => {
    return createAdvancedPage({
      route: 'portafolio.project',
      params: {
        project: node.slug,
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
