import React from 'react'
import { graphql } from 'gatsby'
import { createReactMap } from '../../util'
import { BaseIcon, Button } from '../../components'

function ProjectSkill({ skill, children }) {
  let { id, title, size, icon, props } = skill
  if(!props) {
    props = skill.props = !size ? { children: title } : {
      to: 'projects.skill',
      params: { skill: id },
      children: title,
      title: `View ${size} project${size !== 1 ? 's' : ''} tagged with "${id}" skill`,
    }

    if(icon) {
      skill.Icon = function Icon(props) {
        return <BaseIcon path={icon} {...props} />
      }
    }
  }

  return children
    ? children(skill)
    : <Button color='alt' size='tiny' className='mr-1' {...props} />
}

ProjectSkill.Map = createReactMap(function ProjectSkillMap(skill, { exclude, tags, children }) {
  if (exclude === skill.id || (tags && !tags.every(tag => skill.tags.indexOf(tag) > -1))) {
    return
  }

  return <ProjectSkill key={skill.id} skill={skill} children={children} />
})

export const ProjectSkillFragment = graphql`
  fragment ProjectSkillFragment on ProjectSkill {
    id
    title
    size
  }
`

export default ProjectSkill
