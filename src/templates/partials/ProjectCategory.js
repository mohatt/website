import React from 'react'
import { graphql } from 'gatsby'

function ProjectCategory({ category, children }) {
  if(!category.props) {
    category.props = {
      to: 'projects.category',
      params: { category: category.id },
      children: category.title,
      title: `View ${category.size} project${category.size !== 1 ? 's' : ''} published under "${category.id}" category`,
    }
  }

  return children(category)
}

ProjectCategory.Map = function ProjectCategoryMap({ data, children }) {
  return data.map(category => (
    <ProjectCategory key={category.id} category={category} children={children} />
  ))
}

export const ProjectCategoryFragment = graphql`
  fragment ProjectCategoryFragment on ProjectCategory {
    id
    title
    size
  }
`

export default ProjectCategory
