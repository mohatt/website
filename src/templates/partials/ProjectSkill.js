import React from 'react'
import { BaseIcon } from '../../components'

export default function ProjectSkill({ skill, children }) {
  return children({
    ...skill,
    props: {
      to: 'projects.skill',
      params: { skill: skill.id },
      children: skill.title,
      title: `View ${
        skill.projects !== undefined
          ? skill.projects + ' project' + (skill.projects !== 1 ? 's' : '')
          : 'all projects'
      } tagged with "${skill.id}" skill`,
    },
    Icon(props) {
      return <BaseIcon path={skill.icon} {...props} />
    },
  })
}

ProjectSkill.Map = function ProjectSkillMap({ data, children }) {
  return data.map(skill => (
    <ProjectSkill key={skill.id} skill={skill} children={children} />
  ))
}
