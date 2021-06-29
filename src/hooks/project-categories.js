import { useStaticQuery, graphql } from 'gatsby'
import { ProjectCategory } from '../models'

let cache = null
let computedCache = null

export function useProjectCategories() {
  const data = useStaticQuery(
    graphql`
      query {
        categories: allProjectCategoryYaml {
          nodes {
            id
            title
            desc
            projects
          }
        }
      }
    `
  )

  if (data === cache) {
    return computedCache
  }

  cache = data
  computedCache = data.categories.nodes.map(c => new ProjectCategory(c))
  return computedCache
}

export function useProjectCategory(id) {
  const cats = useProjectCategories()
  const cat = cats.find(c => c.id === id)
  if (cat === undefined) {
    throw new Error(`Invalid project category "${id}".`)
  }
  return cat
}
