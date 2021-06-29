import React from 'react'
import { BaseIcon } from '../components'

export default function ProjectSkill({ id, title, projects, icon, tags }) {
  const props = {
    to: 'projects.skill',
    params: { skill: id },
    children: title,
    title: `View ${projects !== undefined
      ? projects + ' project' + (projects > 1 ? 's' : '')
      : 'all projects'
    } tagged with "${id}" skill`
  }

  return {
    id,
    title,
    projects,
    props,
    tags,
    Icon(props) {
      return <BaseIcon path={icon} {...props} />
    },
  }
}
