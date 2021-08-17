const { pagination } = require('../../config/site')
let data = null

async function getData(graphql) {
  if (data) {
    return data
  }

  const result = await graphql(`
    {
      allProject(filter: { draft: { ne: true } }) {
        edges {
          node {
            slug
          }
        }
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

  data = result.data.allProject
  return data
}

// Projects index pages
async function createIndexPage({ createAdvancedPage }) {
  createAdvancedPage({
    route: 'projects',
    limit: pagination.projectsIndex,
  })
}

// Projects by category list pages
async function createListByCategoryPages({ graphql, createAdvancedPage }) {
  const { categories } = await getData(graphql)
  for (const category of categories) {
    createAdvancedPage({
      route: 'projects.category',
      params: {
        category: category.fieldValue,
      },
      pagination: {
        count: category.totalCount,
        limit: pagination.projectsList,
      },
    })
  }
}

// Projects by skill list pages
async function createListBySkillPages({ graphql, createAdvancedPage }) {
  const { skills } = await getData(graphql)
  for (const skill of skills) {
    createAdvancedPage({
      route: 'projects.skill',
      params: {
        skill: skill.fieldValue,
      },
      pagination: {
        count: skill.totalCount,
        limit: pagination.projectsList,
      },
    })
  }
}

// Project details pages
async function createDetailsPages({ graphql, createAdvancedPage }) {
  const { edges } = await getData(graphql)
  for (const { node } of edges) {
    createAdvancedPage({
      route: 'projects.project',
      params: {
        project: node.slug,
      },
    })
  }
}

module.exports = async args => {
  switch (args.page.templateName) {
    case 'ProjectsIndex.js':
      await createIndexPage(args)
      break
    case 'ProjectsByCategory.js':
      await createListByCategoryPages(args)
      break
    case 'ProjectsBySkill.js':
      await createListBySkillPages(args)
      break
    case 'Project.js':
      await createDetailsPages(args)
      break
    default:
    // Unrecognized page template
  }
}
