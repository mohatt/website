import React from 'react'
import { graphql } from 'gatsby'
import classNames  from 'classnames'
import { PlatformHandle } from '../commons/platforms'
import { Page, Button, Heading, Link, Markdown, Section, Separator } from '../components'
import { ProjectCategory, ProjectSkill, Testimonial } from './partials'

const statuses = {
  CMP: 'Completed',
  ONG: 'Ongoing',
  ARC: 'Archived',
}

function Metadata({ title, children, className }) {
  return (
    <div className={classNames('text-lg leading-normal', className)}>
      <h3 className='text-primary'>{title}</h3>
      <div className='mt-4 font-medium'>{children}</div>
    </div>
  )
}

export default class Project extends Page {
  view() {
    const { data: { project }, pageContext } = this.props
    this.title = project.title
    this.description = project.desc
    this.snippet = {
      $comp: 'Project',
      id: pageContext.project,
    }

    const image = project.image.childImageSharp.gatsbyImageData
    const screens = []
    if (project.hasImage) {
      screens.push(image)
      this.image = image.images.fallback.src
    }
    project.screens.forEach(s => s && screens.push(s.childImageSharp.gatsbyImageData))

    return (
      <Section id={project.categories[0]?.id}>
        <Heading title={this.title} primary>
          {this.description}
        </Heading>
        {screens.length > 0 && (
          <div className='flex overflow-x-auto mb-12'>
            {screens.map((screen, i) => (
              <img key={i} src={screen.images.fallback.src} alt={`Screen ${i + 1}`} />
            ))}
          </div>
        )}
        <div className='grid md:grid-cols-3 gap-x-4 gap-y-8 mb-12'>
          <Metadata title='Project Name'>{project.title}</Metadata>
          <Metadata title='Start Date'>{project.started}</Metadata>
          <Metadata title='Status'>{statuses[project.status] || statuses.CMP}</Metadata>
          {project.skills.length > 0 && (
            <Metadata title='Skills'>
              <ProjectSkill.Map data={project.skills}>
                {({ props }) => <Button color='alt' size='tiny' className='mr-1' {...props} />}
              </ProjectSkill.Map>
            </Metadata>
          )}
          {project.categories.length > 0 && (
            <Metadata title='Categories'>
              <ProjectCategory.Map data={project.categories}>
                {({ props }) => <Button color='alt' size='tiny' className='mr-1' {...props} />}
              </ProjectCategory.Map>
            </Metadata>
          )}
          {project.handles.length > 0 && (
            <Metadata title='Links'>
              <PlatformHandle.Map data={project.handles}>
                {({ title, href, Icon }) => (
                  <Link to={href} external='project_link' className='inline-flex leading-5 mr-4 link'>
                    <Icon className='h-5 mr-2' />
                    {title}
                  </Link>
                )}
              </PlatformHandle.Map>
            </Metadata>
          )}
        </div>
        <div className='xl:max-w-3xl'>
          {project.testimonials[0] && (
            <div className='mb-12'>
              <Separator />
              <Testimonial test={project.testimonials[0]} className='text-primary my-8' />
              <Separator />
            </div>
          )}
          <Markdown>{project.body}</Markdown>
        </div>
      </Section>
    )
  }
}

export const query = graphql`
  query Project($project: String!) {
    project(slug: { eq: $project }) {
      title
      desc
      started(formatString: "YYYY-MM")
      status
      body
      hasImage
      image {
        childImageSharp {
          gatsbyImageData(height: 500)
        }
      }
      screens {
        childImageSharp {
          gatsbyImageData(height: 500)
        }
      }
      categories {
        ...ProjectCategoryFragment
      }
      skills {
        ...ProjectSkillFragment
      }
      handles
      testimonials {
        ...TestimonialFragment
      }
    }
  }
`
