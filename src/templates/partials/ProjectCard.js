import React from 'react'
import { graphql } from 'gatsby'
import { PlatformHandle } from '../../commons/platforms'
import { Button, Link } from '../../components'
import { ProjectSkill, ProjectCategory } from '.'

function ProjectCard ({ project, limitSkills = 4, limitCategories = 2, filterSkills, filterCategories }) {
  const cover = project.cover.childImageSharp.gatsbyImageData
  const props = {
    to: 'projects.project',
    params: { project: project.slug },
    title: 'View project page',
  }
  const categories = filterCategories
    ? project.categories.filter(c => !filterCategories.includes(c.id))
    : project.categories
  const skills = filterSkills
    ? project.skills.filter(s => !filterSkills.includes(s.id))
    : project.skills

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
          {limitCategories > 0 && categories.length > 0 && (
            <div className='absolute -top-4 left-4'>
              <ProjectCategory.Map data={categories.slice(0, limitCategories)}>
                {({ props }) => <Button color='primary' size='tiny' className='mr-1' {...props} />}
              </ProjectCategory.Map>
              {categories.length > limitCategories && (
                <Button size='tiny' color='primary' {...props}>+{categories.length - limitCategories}</Button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='mt-4'>
        <h3><Link className='text-primary hover:underline' {...props}>{project.title}</Link></h3>
        {limitSkills > 0 && skills.length > 0 && (
          <div className='mt-2'>
            <ProjectSkill.Map data={skills.slice(0, limitSkills)}>
              {({ props }) => <Button color='alt' size='tiny' className='mr-1' {...props} />}
            </ProjectSkill.Map>
            {skills.length > limitSkills && (
              <Button size='tiny' color='alt' {...props}>+{skills.length - limitSkills}</Button>
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
  return data.map(project => {
    if (project.node) {
      project = project.node
    }

    return (
      <ProjectCard key={project.slug} project={project} {...props} />
    )
  })
}

export const ProjectCardFragment = graphql`
  fragment ProjectCardFragment on Project {
    slug
    title
    excerpt
    cover {
      childImageSharp {
        gatsbyImageData(
          aspectRatio: 1.8
          width: 430
        )
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
