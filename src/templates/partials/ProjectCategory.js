import React from 'react'
import { graphql } from 'gatsby'
import { createReactMap } from '../../util'
import { Button } from '../../components'

function ProjectCategory({ category, children, color = 'alt' }) {
  let { id, title, size, props } = category
  if(!props) {
    props = category.props = !size ? { children: title } : {
      to: 'projects.category',
      params: { category: id },
      children: title,
      title: `View ${size} project${size !== 1 ? 's' : ''} published under "${id}" category`,
    }
  }

  return children
    ? children(category)
    : <Button color={color} size='tiny' className='mr-1' {...props} />
}

ProjectCategory.Map = createReactMap(function ProjectCategoryMap(category, { exclude, color, children }){
  return exclude !== category.id && (
    <ProjectCategory key={category.id} category={category} color={color} children={children} />
  )
})

export const ProjectCategoryFragment = graphql`
  fragment ProjectCategoryFragment on ProjectCategory {
    id
    title
    size
  }
`

export default ProjectCategory
