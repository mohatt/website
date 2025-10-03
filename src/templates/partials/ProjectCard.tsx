import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { NetworkHandle } from '@/util'
import { Button, Link, Pagination, SvgCard } from '@/components'
import * as cardComponents from '@/project-cards'
import { ProjectCategory, ProjectSkill } from './index'

export interface ProjectCardProps {
  project: Queries.ProjectCardFragment
  skill?: string
  category?: string
}

function ProjectCard({ project, skill, category }: ProjectCardProps) {
  const { slug, title, icon, image, cardComponent, cardProps } = project
  const props = {
    to: 'projects.project',
    params: { project: slug },
    title: 'View project details',
  }

  function createImageCard() {
    return (
      <GatsbyImage
        image={getImage(image)}
        className='rounded-md shadow-lg border-gradient-2'
        alt={title}
      />
    )
  }

  function createSvgCard() {
    let CardComponent = SvgCard
    if (cardComponent) {
      // eslint-disable-next-line import/namespace
      CardComponent = cardComponents[cardComponent]
      if (!CardComponent) {
        throw new Error(`Unknown card component: ${String(cardComponent)}`)
      }
    }
    const iconSize = (cardProps?.iconSize as number) ?? 64
    return (
      <div className='rounded-md shadow-lg border-gradient-2'>
        <CardComponent
          title={title}
          {...cardProps}
          responsive
          seed={slug}
          icon={icon}
          iconSize={iconSize}
          gap={96 - iconSize}
        />
      </div>
    )
  }

  const cardNode =
    // If the project has a card component, use it.
    // Otherwise, if the project has an image, use the image.
    // Otherwise, use the icon if it's provided, otherwise use the placeholder card.
    cardComponent || (!project.hasImage && icon) ? createSvgCard() : createImageCard()

  return (
    <div className='max-w-[430px]'>
      <div>
        <div className='relative'>
          <Link className='block' {...props}>
            {cardNode}
          </Link>
          <NetworkHandle.Map data={project.handles} limit={2}>
            {(items) => <div className='absolute -bottom-4 right-4 z-10'>{items}</div>}
            {({ title, href, Icon }, _i) => (
              <Button
                href={href}
                linkId='project_card_link'
                title={title}
                size='mono'
                className='!border-primary ml-3'
                children={<Icon className='h-5' />}
              />
            )}
          </NetworkHandle.Map>
          <ProjectCategory.Map
            data={project.categories}
            exclude={category}
            limit={2}
            color='primary'
          >
            {(items) => <div className='absolute -top-4 left-4 z-10'>{items}</div>}
          </ProjectCategory.Map>
        </div>
      </div>
      <div className='mt-4'>
        <Link className='link-primary text-xl' {...props}>
          {title}
        </Link>
        <ProjectSkill.Map data={project.skills} exclude={skill} limit={8}>
          {(items) => (
            <div className='mt-3 flex overflow-hidden relative'>
              {items}
              <span className='overflow-grad h-full' />
            </div>
          )}
        </ProjectSkill.Map>
        <div className='mt-3 text-base max-h-12 overflow-hidden relative'>
          {project.desc}.
          <span className='overflow-grad h-1/2 min-h-6' />
        </div>
      </div>
    </div>
  )
}

export interface ProjectCardMapProps extends Omit<ProjectCardProps, 'project'> {
  data:
    | readonly Queries.ProjectCardFragment[]
    | Pick<Queries.ProjectCardGridPaginatedFragment, 'edges'>
}

ProjectCard.Map = function ProjectCardMap({ data, ...props }: ProjectCardMapProps) {
  if ('edges' in data) {
    return data.edges.map(({ node: project }) => {
      return <ProjectCard key={project.slug} project={project} {...props} />
    })
  }

  return data.map((project) => {
    return <ProjectCard key={project.slug} project={project} {...props} />
  })
}

export interface ProjectCardGridProps {
  data: readonly Queries.ProjectCardFragment[] | Queries.ProjectCardGridPaginatedFragment
  paginationRote?: string
  paginationParams?: {
    skill?: string
    category?: string
  }
}

ProjectCard.Grid = function ProjectCardGrid({
  data,
  paginationRote,
  paginationParams,
}: ProjectCardGridProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 text-lg'>
      <ProjectCard.Map
        data={data}
        category={paginationParams?.category}
        skill={paginationParams?.skill}
      />
      {paginationRote && 'pageInfo' in data && (
        <Pagination route={paginationRote} params={paginationParams} pageInfo={data.pageInfo} />
      )}
    </div>
  )
}

export const ProjectCardFragment = graphql`
  fragment ProjectCard on Project {
    slug
    title
    desc
    icon
    cardComponent
    cardProps
    image {
      childImageSharp {
        gatsbyImageData(aspectRatio: 1.8, width: 430, placeholder: BLURRED)
      }
    }
    hasImage
    handles
    categories {
      ...ProjectCategory
    }
    skills {
      ...ProjectSkill
    }
  }
`

export const ProjectCardGridPaginatedFragment = graphql`
  fragment ProjectCardGridPaginated on ProjectConnection {
    edges {
      node {
        ...ProjectCard
      }
    }
    pageInfo {
      ...Pagination
    }
  }
`

export default ProjectCard
