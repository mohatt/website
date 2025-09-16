import { graphql } from 'gatsby'
import { createReactMap, ReactMapItemProps } from '@/util'
import Button, { LinkButtonProps } from '@/components/Button'

type ProjectCategoryItem = Queries.ProjectCategoryFragment

export interface ProjectCategoryChildItem extends ProjectCategoryItem {
  props: LinkButtonProps
}

export interface ProjectCategoryProps
  extends ReactMapItemProps<ProjectCategoryItem, ProjectCategoryChildItem> {
  color?: LinkButtonProps['color']
}

function ProjectCategory({ item, index, children, color = 'alt' }: ProjectCategoryProps) {
  const { slug, title, size } = item
  const props: LinkButtonProps = !size
    ? { children: title }
    : {
        to: 'projects.category',
        params: { category: slug },
        children: title,
        title: `View ${size} project${size !== 1 ? 's' : ''} published under "${title}" category`,
      }

  return children ? (
    children({ ...item, props }, index)
  ) : (
    <Button color={color} size='tiny' className='mr-1' {...props} />
  )
}

interface ProjectCategoryMapProps {
  color?: LinkButtonProps['color']
  exclude?: string
}

ProjectCategory.Map = createReactMap<
  ProjectCategoryItem,
  ProjectCategoryMapProps,
  ProjectCategoryChildItem
>(function ProjectCategoryMap({ exclude, ...props }) {
  const { slug } = props.item
  if (exclude === slug) {
    return null
  }
  return <ProjectCategory key={slug} {...props} />
})

export const ProjectCategoryFragment = graphql`
  fragment ProjectCategory on ProjectCategory {
    slug
    title
    size
  }
`

export default ProjectCategory
