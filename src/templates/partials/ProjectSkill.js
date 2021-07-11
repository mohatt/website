import React from 'react'
import { graphql } from 'gatsby'
import { BaseIcon } from '../../components'

function ProjectSkill({ skill, children }) {
  if(!skill.props) {
    skill.props = {
      to: 'projects.skill',
      params: { skill: skill.id },
      children: skill.title,
      title: `View ${skill.size} project${skill.size !== 1 ? 's' : ''} tagged with "${skill.id}" skill`,
    }
    if(skill.icon) {
      skill.Icon = function Icon(props) {
        return <BaseIcon path={skill.icon} {...props} />
      }
    }
  }

  return children(skill)
}

ProjectSkill.Map = function ProjectSkillMap({ data, children }) {
  return data.map(skill => (
    <ProjectSkill key={skill.id} skill={skill} children={children} />
  ))
}

export const ProjectSkillFragment = graphql`
  fragment ProjectSkillFragment on ProjectSkill {
    id
    title
    size
  }
`

export default ProjectSkill
