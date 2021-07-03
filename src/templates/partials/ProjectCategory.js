import React from 'react'

export default function ProjectCategory({ category, children }) {
  return children({
    ...category,
    props: {
      to: 'projects.category',
      params: { category: category.id },
      children: category.title,
      title: `View ${
        category.projects !== undefined
          ? category.projects + ' project' + (category.projects !== 1 ? 's' : '')
          : 'all projects'
      } published under "${category.id}" category`,
    },
  })
}

ProjectCategory.Map = function ProjectCategoryMap({ data, children }) {
  return data.map(category => (
    <ProjectCategory key={category.id} category={category} children={children} />
  ))
}
