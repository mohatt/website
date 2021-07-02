import React from 'react'
import { BaseIcon } from '../components'

export default function ProjectSkill(data) {
  return { ...data,
    props: {
      to: 'projects.skill',
      params: { skill: data.id },
      children: data.title,
      title: `View ${data.projects !== undefined
        ? data.projects + ' project' + (data.projects !== 1 ? 's' : '')
        : 'all projects'
      } tagged with "${data.id}" skill`
    },
    Icon(props) {
      return <BaseIcon path={data.icon} {...props} />
    },
  }
}
