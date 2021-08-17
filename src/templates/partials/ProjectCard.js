import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { NetworkHandle } from '../../util'
import { Button, Link, Pagination } from '../../components'
import { ProjectCategory, ProjectSkill } from '.'

function ProjectCard({ project, skill, category }) {
  const props = {
    to: 'projects.project',
    params: { project: project.slug },
    title: 'View project details',
  }

  return (
    <div className='max-w-[430px]'>
      <div>
        <div className='relative'>
          <Link className='block' {...props}>
            <GatsbyImage
              image={getImage(project.image)}
              className='border-2 border-primary rounded-md shadow-lg'
              alt={project.title}
            />
          </Link>
          <NetworkHandle.Map data={project.handles} limit={2}>
            {items => (
              <div className='absolute -bottom-4 right-4'>
                {items}
              </div>
            )}
            {({ title, href, Icon }) => (
              <Button
                to={href}
                external='project_card_link'
                title={title}
                size='mono'
                className='!border-primary ml-3'
                children={<Icon className='h-5' />}
              />
            )}
          </NetworkHandle.Map>
          <ProjectCategory.Map data={project.categories} exclude={category} limit={2} color='primary'>
            {items => (
              <div className='absolute -top-4 left-4'>
                {items}
              </div>
            )}
          </ProjectCategory.Map>
        </div>
      </div>
      <div className='mt-4'>
        <Link className='link-primary' {...props}>
          {project.title}
        </Link>
        <ProjectSkill.Map data={project.skills} exclude={skill} limit={8}>
          {items => (
            <div className='mt-3 flex overflow-hidden relative'>
              {items}
              <span className='overflow-grad h-full' />
            </div>
          )}
        </ProjectSkill.Map>
        <div className='mt-3 text-base max-h-12 overflow-hidden relative'>
          {project.desc}
          <span className='overflow-grad h-1/2' />
        </div>
      </div>
    </div>
  )
}

ProjectCard.Map = function ProjectCardMap({ data, ...props }) {
  return (data.edges || data).map(project => {
    if (data.edges) {
      project = project.node
    }

    return <ProjectCard key={project.slug} project={project} {...props} />
  })
}

ProjectCard.Grid = function ProjectCardGrid({ data, paginated, params }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 text-lg'>
      <ProjectCard.Map data={data} category={params.category} skill={params.skill} />
      {paginated && (
        <Pagination route={paginated} params={params} pageInfo={data.pageInfo} />
      )}
    </div>
  )
}

export const ProjectCardFragment = graphql`
  fragment ProjectCardFragment on Project {
    slug
    title
    desc
    image {
      childImageSharp {
        gatsbyImageData(aspectRatio: 1.8, width: 430, placeholder: BLURRED)
      }
    }
    handles
    categories {
      ...ProjectCategoryFragment
    }
    skills {
      ...ProjectSkillFragment
    }
  }
`

export const ProjectCardGridPaginatedFragment = graphql`
  fragment ProjectCardGridPaginatedFragment on ProjectConnection {
    edges {
      node {
        ...ProjectCardFragment
      }
    }
    pageInfo {
      ...Pagination
    }
  }
`

export default ProjectCard
