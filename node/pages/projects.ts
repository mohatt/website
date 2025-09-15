import type { CreatePagesArgs } from 'gatsby'
import type { PageHelperFunction } from 'gatsby-plugin-advanced-pages/node'

// Pagination limits for projects index page
const PAGINATION_LIMIT_PROJECTS_INDEX = 6
// Pagination limits for projects list pages
const PAGINATION_LIMIT_PROJECTS_LIST = 12

// Used to cache the data fetched from GraphQL
let data = null

/**
 * Fetches the data needed from GraphQL.
 */
async function getData(graphql: CreatePagesArgs['graphql']) {
  if (data) {
    return data
  }

  const result = await graphql<{ allProject: typeof data }>(`
    {
      allProject(filter: { draft: { ne: true } }) {
        edges {
          node {
            slug
            parent {
              internal {
                contentFilePath
              }
            }
          }
        }
        skills: group(field: { skills: { slug: SELECT } }) {
          fieldValue
          totalCount
        }
        categories: group(field: { categories: { slug: SELECT } }) {
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

/**
 * Projects index pages.
 */
const createIndexPage: PageHelperFunction = async function ({ createAdvancedPage }) {
  createAdvancedPage({
    route: 'projects',
    limit: PAGINATION_LIMIT_PROJECTS_INDEX,
  })
}

/**
 * Projects by category list pages.
 */
const createByCategoryPages: PageHelperFunction = async function ({ graphql, createAdvancedPage }) {
  const { categories } = await getData(graphql)
  for (const category of categories) {
    createAdvancedPage({
      route: 'projects.category',
      params: {
        category: category.fieldValue,
      },
      pagination: {
        count: category.totalCount,
        limit: PAGINATION_LIMIT_PROJECTS_LIST,
      },
    })
  }
}

/**
 * Projects by skill list pages.
 */
const createBySkillPages: PageHelperFunction = async function ({ graphql, createAdvancedPage }) {
  const { skills } = await getData(graphql)
  for (const skill of skills) {
    createAdvancedPage({
      route: 'projects.skill',
      params: {
        skill: skill.fieldValue,
      },
      pagination: {
        count: skill.totalCount,
        limit: PAGINATION_LIMIT_PROJECTS_LIST,
      },
    })
  }
}

/**
 * Project details pages.
 */
const createDetailsPages: PageHelperFunction = async function ({ graphql, createAdvancedPage }) {
  const { edges } = await getData(graphql)
  for (const { node } of edges) {
    createAdvancedPage({
      route: 'projects.project',
      params: {
        project: node.slug,
      },
      templateArgs: {
        // Required for gatsby-plugin-mdx to render mdx content into React element
        __contentFilePath: node.parent.internal.contentFilePath,
      },
    })
  }
}

const helperFn: PageHelperFunction = async function ProjectsHelperFn(args) {
  switch (args.page.templateName) {
    case 'ProjectsIndex.tsx':
      await createIndexPage(args)
      break
    case 'ProjectsByCategory.tsx':
      await createByCategoryPages(args)
      break
    case 'ProjectsBySkill.tsx':
      await createBySkillPages(args)
      break
    case 'Project.tsx':
      await createDetailsPages(args)
      break
    default:
    // Unrecognized page template
  }
}

export default helperFn
