import type { FC } from 'react'
import { graphql } from 'gatsby'
import { createReactMap, ReactMapItemProps } from '../../util'
import BaseIcon, { BaseIconProps } from '../../components/BaseIcon'
import Button, { LinkButtonProps } from '../../components/Button'

export interface ProjectSkillItem extends Queries.ProjectSkillFragment {
  icon?: string
  tags?: readonly string[]
}

export interface ProjectSkillChildItem extends ProjectSkillItem {
  props: LinkButtonProps
  Icon?: FC<BaseIconProps>
}

export interface ProjectSkillProps
  extends ReactMapItemProps<ProjectSkillItem, ProjectSkillChildItem> {}

function ProjectSkill({ item: skill, index, children }: ProjectSkillProps) {
  const { slug, title, size, icon } = skill
  const props: LinkButtonProps = !size
    ? { children: title }
    : {
        to: 'projects.skill',
        params: { skill: slug },
        children: title,
        title: `View ${size} project${size !== 1 ? 's' : ''} tagged with "${slug}" skill`,
      }

  if (children) {
    const Icon: FC<BaseIconProps> =
      icon &&
      function Icon(props) {
        return <BaseIcon path={icon} {...props} />
      }
    return children({ ...skill, props, Icon }, index)
  }

  return <Button color='alt' size='tiny' className='mr-1' {...props} />
}

interface ProjectSkillMapProps {
  exclude?: string
  tags?: readonly string[]
}

ProjectSkill.Map = createReactMap<ProjectSkillItem, ProjectSkillMapProps, ProjectSkillChildItem>(
  function ProjectSkillMap({ exclude, tags, ...props }) {
    const skill = props.item
    if (exclude === skill.slug || (tags && !tags.every((tag) => skill.tags.includes(tag)))) {
      return null
    }

    return <ProjectSkill key={skill.slug} {...props} />
  },
)

export const ProjectSkillFragment = graphql`
  fragment ProjectSkill on ProjectSkill {
    slug
    title
    size
  }
`

export default ProjectSkill
