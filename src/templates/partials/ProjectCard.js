import React from 'react'
import { graphql } from 'gatsby'
import { PlatformHandle } from '../../commons/platforms'
import { Button, Link } from '../../components'
import { ProjectCategory, ProjectSkill } from '.'

function filter(data, exclude, limit) {
  const filtered = (exclude ? data.filter(o => o.id !== exclude) : data).slice(0, limit)
  filtered.diff = data.length - filtered.length
  return filtered
}

function ProjectCard({ project, children, skill, category }) {
  const image = project.image.childImageSharp.gatsbyImageData
  const props = {
    to: 'projects.project',
    params: { project: project.slug },
    title: 'View project details page',
  }
  const categories = filter(project.categories, category, 2)
  const skills = filter(project.skills, skill, 4)

  if (children instanceof Function) {
    return children(Object.assign({}, project, { image, categories, skills, props }))
  }

  return (
    <div>
      <div>
        <div className='relative' style={{ maxWidth: image.width }}>
          <Link className='block' {...props}>
            <img className='w-full border-2 border-primary rounded-md shadow-lg' src={image.images.fallback.src} alt={project.title} />
          </Link>
          {project.handles.length > 0 && (
            <div className='absolute -bottom-4 right-4'>
              <PlatformHandle.Map data={project.handles.slice(0, 2)}>
                {({ title, href, Icon }) => (
                  <Button
                    to={href}
                    external='project_card_link'
                    title={title}
                    size='mono'
                    className='border-primary ml-3'
                    children={<Icon className='h-5' />}
                  />
                )}
              </PlatformHandle.Map>
            </div>
          )}
          {categories.length > 0 && (
            <div className='absolute -top-4 left-4'>
              <ProjectCategory.Map data={categories}>
                {({ props }) => <Button color='primary' size='tiny' className='mr-1' {...props} />}
              </ProjectCategory.Map>
              {categories.diff > 0 && (
                <Button size='tiny' color='primary' {...props}>
                  +{categories.diff}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='mt-4'>
        <h3>
          <Link className='link-primary' {...props}>
            {project.title}
          </Link>
        </h3>
        {skills.length > 0 && (
          <div className='mt-2'>
            <ProjectSkill.Map data={skills}>
              {({ props }) => <Button color='alt' size='tiny' className='mr-1' {...props} />}
            </ProjectSkill.Map>
            {skills.diff > 0 && (
              <Button size='tiny' color='alt' {...props}>
                +{skills.diff}
              </Button>
            )}
          </div>
        )}
        <div className='mt-4'>
          {project.desc}
        </div>
      </div>
    </div>
  )
}

ProjectCard.Map = function ProjectCardMap({ data, children, ...props }) {
  return (data.edges || data).map(project => {
    if (data.edges) {
      project = project.node
    }

    return <ProjectCard key={project.slug} project={project} children={children} {...props} />
  })
}

export const ProjectCardFragment = graphql`
  fragment ProjectCardFragment on Project {
    slug
    title
    desc
    image {
      childImageSharp {
        gatsbyImageData(aspectRatio: 1.8, width: 430)
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

export default ProjectCard
