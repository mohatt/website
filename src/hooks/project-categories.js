import { graphql, useStaticQuery } from 'gatsby'

export function useProjectCategories() {
  const data = useStaticQuery(
    graphql`
      query {
        categories: allProjectCategory {
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

  return data.categories.nodes
}

export function useProjectCategory(id) {
  const cats = useProjectCategories()
  const cat = cats.find(c => c.id === id)
  if (cat === undefined) {
    throw new Error(`Invalid project category "${id}".`)
  }
  return cat
}
