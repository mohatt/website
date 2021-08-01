import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { themeScreens } from '../constants'
import { cx, PlatformHandle } from '../util'
import { useLightbox } from '../hooks'
import { Page, Heading, Link, Markdown, Section, Separator } from '../components'
import { ProjectCategory, ProjectSkill, Testimonial } from './partials'

const statuses = {
  CMP: 'Completed',
  ONG: 'Ongoing',
  ARC: 'Archived',
}

function Gallery({ screens }) {
  const [lightbox, styles] = useLightbox({
    dataSource: screens.map(({ org, full, thumb }) => ({
      w: org.width,
      h: org.height,
      src: full.images.fallback.src,
      srcset: full.images.fallback.srcSet,
      msrc: thumb.placeholder.fallback,
    })),
  })

  return (
    <div className='flex overflow-x-auto mb-12'>
      <style>{styles}</style>
      {screens.map(({ thumb }, i) => {
        const cls = `scr_thumb_${i}`
        const ratio = thumb.width / thumb.height
        return (
          <div key={i} className={`flex-shrink-0 cursor-zoom mr-1 ${cls}`} onClick={() => lightbox.loadAndOpen(i)}>
            <style>{`.${cls} { width: ${200 * ratio}px }
              @media(min-width: ${themeScreens.lg}) {
                .${cls} { width: ${300 * ratio}px }
              }
              @media(min-width: ${themeScreens['2xl']}) {
                .${cls} { width: ${500 * ratio}px }
              }`.replace(/\s+/g, '')}
            </style>
              <GatsbyImage image={thumb} alt={`Screen ${i + 1}`} />
          </div>
        )
      })}
    </div>
  )
}

function Metadata({ title, children, className }) {
  return (
    <div className={cx('text-lg leading-normal', className)}>
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

    const image = project.image.childImageSharp
    const screens = []
    if (project.hasImage) {
      screens.push(image)
      this.image = image.thumb.images.fallback.src
    }
    project.screens.forEach(s => s && screens.push(s.childImageSharp))

    return (
      <Section id={project.categories[0]?.id}>
        <Heading title={this.title} primary>
          {this.description}
        </Heading>
        {screens.length && <Gallery screens={screens}/>}
        <div className='grid md:grid-cols-3 gap-x-4 gap-y-8 mb-12'>
          <Metadata title='Project Name'>{project.title}</Metadata>
          <Metadata title='Start Date'>{project.started}</Metadata>
          <Metadata title='Status'>{statuses[project.status] || statuses.CMP}</Metadata>
          <ProjectSkill.Map data={project.skills}>
            {items => <Metadata title='Skills'>{items}</Metadata>}
          </ProjectSkill.Map>
          <ProjectCategory.Map data={project.categories}>
            {items => <Metadata title='Categories'>{items}</Metadata>}
          </ProjectCategory.Map>
          <PlatformHandle.Map data={project.handles}>
            {items => <Metadata title='Links'>{items}</Metadata>}
            {({ title, href, Icon }) => (
              <Link to={href} external='project_link' className='link mr-4'>
                <Icon className='h-5 mr-2' />
                <span>{title}</span>
              </Link>
            )}
          </PlatformHandle.Map>
        </div>
        <div className='xl:max-w-3xl'>
          <Testimonial.Map data={project.testimonials} limit={1} className='text-primary my-8'>
            {items => (
              <div className='mb-12'>
                <Separator />
                {items}
                <Separator />
              </div>
            )}
          </Testimonial.Map>
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
          org: original {
            width
            height
          }
          thumb: gatsbyImageData(height: 500, placeholder: BLURRED)
          full: gatsbyImageData(layout: FULL_WIDTH, formats: [AUTO])
        }
      }
      screens {
        childImageSharp {
          org: original {
            width
            height
          }
          thumb: gatsbyImageData(height: 500, placeholder: BLURRED)
          full: gatsbyImageData(layout: FULL_WIDTH, formats: [AUTO])
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
