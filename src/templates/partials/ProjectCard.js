import React from 'react'
import { graphql } from 'gatsby'
import classNames from 'classnames'
import { Project } from '../../models'
import { Button, Icon, Link } from '../../components'

function ProjectCard ({ project: data, limitSkills = 4, limitCategories = 2, excludeSkills, excludeCategories }) {
  const project = new Project(data)
  const linkProps = {
    to: 'projects.project',
    params: { project: project.slug },
    title: `View '${project.title}' project page`,
  }
  const categories = excludeCategories
    ? project.categories.filter(c => !excludeCategories.includes(c.id))
    : project.categories
  const skills = excludeSkills
    ? project.skills.filter(s => !excludeSkills.includes(s.id))
    : project.skills

  return (
    <div>
      <div>
        <div className='relative' style={{ maxWidth: project.cover.width }}>
          <Link className='block' {...linkProps}>
            <img className='w-full border-2 border-primary rounded-md shadow-lg' src={project.cover.images.fallback.src} alt={project.title} />
          </Link>
          {project.handles.length > 0 && (
            <div className='absolute -bottom-4 right-4'>
              {project.handles.map(({ title, href, icon }, i) => (
                <Button
                  key={i}
                  mono
                  to={href}
                  external='project_card_link'
                  className='text-sm border-2 border-primary ml-3'
                  title={title}
                  children={<Icon name={icon} className='w-5' />}
                />
              ))}
            </div>
          )}
          {limitCategories > 0 && categories.length > 0 && (
            <div className='absolute -top-4 left-4'>
              {categories
                .slice(0, limitCategories)
                .map(({ id, props }) => (
                  <Button key={id} color='primary' size='tiny' className='mr-1' {...props} />
              ))}
              {categories.length > limitCategories && (
                <Button size='tiny' color='primary' {...linkProps}>&hellip;</Button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='mt-4'>
        <h3><Link className='text-primary hover:underline' {...linkProps}>{project.title}</Link></h3>
        {limitSkills > 0 && skills.length > 0 && (
          <div className='mt-2'>
            {skills
              .slice(0, limitSkills)
              .map(({ id, props }) => (
                <Button key={id} color='alt' size='tiny' className='mr-1' {...props} />
            ))}
            {skills.length > limitSkills && (
              <Button size='tiny' color='alt' {...linkProps}>&hellip;</Button>
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

ProjectCard.Grid = function ProjectCardGrid({ children, className }) {
  return (
    <div className={classNames('grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8 text-lg', className)}>
      {children}
    </div>
  )
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
    github
    homepage
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
