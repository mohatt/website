import React from 'react'
import { graphql } from 'gatsby'
import { createReactMap } from '../../util'
import { Button } from '../../components'

function ProjectCategory({ category, children, color = 'alt' }) {
  let { slug, title, size, props } = category
  if (!props) {
    props = category.props = !size
      ? { children: title }
      : {
          to: 'projects.category',
          params: { category: slug },
          children: title,
          title: `View ${size} project${size !== 1 ? 's' : ''} published under "${title}" category`,
        }
  }

  return children ? (
    children(category)
  ) : (
    <Button color={color} size='tiny' className='mr-1' {...props} />
  )
}

ProjectCategory.Map = createReactMap(function ProjectCategoryMap(
  category,
  { exclude, color, children },
) {
  return (
    exclude !== category.slug && (
      <ProjectCategory key={category.slug} category={category} color={color} children={children} />
    )
  )
})

export const ProjectCategoryFragment = graphql`
  fragment ProjectCategoryFragment on ProjectCategory {
    slug
    title
    size
  }
`

export default ProjectCategory
