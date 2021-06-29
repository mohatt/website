import React from 'react'
import { graphql } from 'gatsby'
import classNames from 'classnames'
import { Project as ProjectModel } from '../models'
import { Page, Markdown, Typography, Heading, Section, Button, Icon, Link } from '../components'

function ProjectMetadata({ title, children, className }) {
  return (
    <div className={classNames('text-lg leading-normal', className)}>
      <h3 className='text-primary'>{title}</h3>
      <div className='mt-4 font-medium'>{children}</div>
    </div>
  )
}

export default class Project extends Page {
  view() {
    const { data, pageContext } = this.props
    const project = new ProjectModel(data.project)
    this.title = project.title
    this.snippet = {
      $comp: 'Project',
      id: pageContext.project,
    }

    return (
      <Section>
        <Heading title={this.title} primary>
          {project.excerpt}
        </Heading>
        {project.screens.length > 0 && (
          <div className='flex overflow-x-auto mb-12'>
            {project.screens.map((screen, i) => (
              <img key={i} src={screen.images.fallback.src} alt={`Screen ${i+1}`} />
            ))}
          </div>
        )}
        <div className='grid md:grid-cols-3 gap-x-4 gap-y-8 mb-12'>
          <ProjectMetadata title='Project Name'>{project.title}</ProjectMetadata>
          <ProjectMetadata title='Start Date'>{project.started}</ProjectMetadata>
          {project.categories.length > 0 && (
            <ProjectMetadata title='Categories'>
              {project.categories.map(({ id, props }) => (
                <Button key={id} color='alt' size='tiny' className='mr-1' {...props} />
              ))}
            </ProjectMetadata>
          )}
          {project.skills.length > 0 && (
            <ProjectMetadata title='Skills' className=''>
              {project.skills.map(({ id, props }) => (
                <Button key={id} color='alt' size='tiny' className='mr-1' {...props} />
              ))}
            </ProjectMetadata>
          )}
          {project.handles.length > 0 && (
            <ProjectMetadata title='Links'>
              {project.handles.map(({ title, href, icon }, i) => (
                <Link key={i} to={href} external='project_link' className='inline-flex leading-5 mr-4 text-primary hover:underline'>
                  <Icon name={icon} className='h-5 mr-2' />
                  {title}
                </Link>
              ))}
            </ProjectMetadata>
          )}
        </div>
        <Typography className='xl:max-w-3xl'>
          <Markdown>{project.body}</Markdown>
        </Typography>
      </Section>
    )
  }
}

export const query = graphql`
  query Project($project: String!) {
    project(slug: { eq: $project }) {
      title
      excerpt
      started(formatString: "YYYY-MM")
      body
      hasCover
      cover {
        childImageSharp {
          gatsbyImageData(
            aspectRatio: 1.8
            width: 750
          )
        }
      }
      screens {
        childImageSharp {
          gatsbyImageData(
            aspectRatio: 1.8
            width: 750
          )
        }
      }
      skills {
        id
        title
        projects
      }
      categories {
        id
        title
        projects
      }
      homepage
      github
    }
  }
`
