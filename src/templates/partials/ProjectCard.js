import React from 'react'
import { graphql } from 'gatsby'
import { PlatformHandle } from '../../commons/platforms'
import { Button, Link } from '../../components'
import { ProjectCategory, ProjectSkill } from '.'

function applyFilters(data, exclude, limit) {
  const filtered = (
    exclude && exclude.length > 0
      ? data.filter(o => !exclude.includes(o.id))
      : data
  ).slice(0, limit)
  filtered.diff = data.length - filtered.length
  return filtered
}

function ProjectCard({ project, children, limitSkills = 4, limitCategories = 2, filterSkills, filterCategories }) {
  const cover = project.cover.childImageSharp.gatsbyImageData
  const props = {
    to: 'projects.project',
    params: { project: project.slug },
    title: 'View project details page',
  }
  const categories = applyFilters(project.categories, filterCategories, limitCategories)
  const skills = applyFilters(project.skills, filterSkills, limitSkills)

  if (typeof children === 'function') {
    return children({ ...project, cover, categories, skills, props })
  }

  return (
    <div>
      <div>
        <div className='relative' style={{ maxWidth: cover.width }}>
          <Link className='block' {...props}>
            <img className='w-full border-2 border-primary rounded-md shadow-lg' src={cover.images.fallback.src} alt={project.title} />
          </Link>
          {project.handles && (
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
          <Link className='text-primary hover:underline' {...props}>
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
          {project.excerpt}
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
    excerpt
    cover {
      childImageSharp {
        gatsbyImageData(aspectRatio: 1.8, width: 430)
      }
    }
    handles
    categories {
      id
      title
      projects
    }
    skills {
      id
      title
      projects
    }
  }
`

export default ProjectCard
