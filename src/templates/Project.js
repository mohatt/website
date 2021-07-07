import React from 'react'
import { graphql } from 'gatsby'
import { PlatformHandle } from '../commons/platforms'
import { Page, Button, Heading, Icon, Link, Markdown, Section } from '../components'
import { ProjectCategory, ProjectSkill } from './partials'

function ProjectMetadata({ title, children }) {
  return (
    <div className='text-lg leading-normal'>
      <h3 className='text-primary'>{title}</h3>
      <div className='mt-4 font-medium'>{children}</div>
    </div>
  )
}

export default class Project extends Page {
  view() {
    const { data: { project }, pageContext } = this.props
    this.title = project.title
    this.description = project.excerpt
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
    if (project.screens) {
      project.screens.forEach(s => s && screens.push(s.childImageSharp.gatsbyImageData))
    }

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
          <ProjectMetadata title='Project Name'>{project.title}</ProjectMetadata>
          <ProjectMetadata title='Start Date'>{project.started}</ProjectMetadata>
          {project.categories.length > 0 && (
            <ProjectMetadata title='Categories'>
              <ProjectCategory.Map data={project.categories}>
                {({ props }) => <Button color='alt' size='tiny' className='mr-1' {...props} />}
              </ProjectCategory.Map>
            </ProjectMetadata>
          )}
          {project.skills.length > 0 && (
            <ProjectMetadata title='Skills'>
              <ProjectSkill.Map data={project.skills}>
                {({ props }) => <Button color='alt' size='tiny' className='mr-1' {...props} />}
              </ProjectSkill.Map>
            </ProjectMetadata>
          )}
          {project.handles && (
            <ProjectMetadata title='Links'>
              <PlatformHandle.Map data={project.handles}>
                {({ title, href, icon }) => (
                  <Link to={href} external='project_link' className='inline-flex leading-5 mr-4 text-primary hover:underline'>
                    <Icon name={icon} className='h-5 mr-2' />
                    {title}
                  </Link>
                )}
              </PlatformHandle.Map>
            </ProjectMetadata>
          )}
        </div>
        <div className='xl:max-w-3xl'>
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
      excerpt
      started(formatString: "YYYY-MM")
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
      handles
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
    }
  }
`
