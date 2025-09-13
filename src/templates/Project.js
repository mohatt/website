import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { themeScreens } from '../constants'
import { cx, NetworkHandle } from '../util'
import { useLightbox } from '../hooks'
import { Page, Heading, Link, Mdx, Section } from '../components'
import { ProjectSkill, Testimonial } from './partials'

function ProjectGallery({ screens }) {
  const lightbox = useLightbox({
    showHideAnimationType: 'none',
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
      {screens.map(({ thumb }, i) => {
        const cls = `scr_thumb_${i}`
        const ratio = thumb.width / thumb.height
        return (
          <div
            key={i}
            className={`flex-shrink-0 cursor-zoom mr-1 ${cls}`}
            onClick={() => lightbox.loadAndOpen(i)}
          >
            <style>
              {`.${cls} { width: ${200 * ratio}px }
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
      <div className='mt-3 font-medium'>{children}</div>
    </div>
  )
}

export default class Project extends Page {
  view() {
    const {
      data: { project },
      children,
      pageContext,
    } = this.props
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
      this.image = image.socialBanner
    }
    project.screens.forEach((s) => s && screens.push(s.childImageSharp))

    if (project.categories.some(({ slug }) => slug === 'portfolio')) {
      this.seoTitle = `${project.title} (Case Study)`
      // Don't index portfolio projects
      this.noIndex = true
    }

    return (
      <>
        <Section>
          <Heading title={this.title} primary>
            {this.description}
          </Heading>
          {screens.length > 1 && <ProjectGallery screens={screens} />}
          <div className='grid md:grid-cols-3 gap-x-4 gap-y-8'>
            <ProjectSkill.Map data={project.skills}>
              {(items) => <Metadata title='Skills'>{items}</Metadata>}
            </ProjectSkill.Map>
            <NetworkHandle.Map data={project.handles}>
              {(items) => <Metadata title='Links'>{items}</Metadata>}
              {({ title, href, Icon }, _i) => (
                <Link href={href} linkId='project_link' className='link mr-4 mb-1'>
                  <Icon className='w-5 mr-2' />
                  <span>{title}</span>
                </Link>
              )}
            </NetworkHandle.Map>
            <Metadata title='Started'>{project.started}</Metadata>
          </div>
        </Section>
        <Testimonial.Map data={project.testimonials} limit={1}>
          {(items) => (
            <Section fill>
              <div className='xl:max-w-4xl'>{items}</div>
            </Section>
          )}
        </Testimonial.Map>
        <Section>
          <div className='xl:max-w-4xl'>
            <Mdx>{children}</Mdx>
          </div>
        </Section>
      </>
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
      hasImage
      image {
        ...SocialBanner
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
        ...ProjectCategory
      }
      skills {
        ...ProjectSkill
      }
      handles
      testimonials {
        ...Testimonial
      }
    }
  }
`
