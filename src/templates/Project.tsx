import { graphql, PageProps } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { themeScreens } from '@/constants'
import { NetworkHandle } from '@/util'
import { useElementsRef, useLightbox, useScrollbars } from '@/hooks'
import { Heading, Detail, Link, Mdx, Section } from '@/components'
import { PageHead, PageLayout } from '@/layouts/page'
import { ProjectSkill, Testimonial } from './partials'

interface ProjectGalleryProps {
  screens: Array<Queries.ProjectQuery['project']['screens'][0]['childImageSharp']>
}

function ProjectGallery({ screens }: ProjectGalleryProps) {
  const [galleryRef] = useScrollbars<HTMLDivElement>({ defer: true })
  const [itemRefs, itemRef] = useElementsRef()
  const lightbox = useLightbox(
    () => ({
      dataSource: screens.map(({ org, full, thumb }, i) => ({
        w: org.width,
        h: org.height,
        src: full.images.fallback.src,
        srcset: full.images.fallback.srcSet,
        msrc: thumb.placeholder.fallback,
        element: itemRefs.current[i],
        alt: `Screen ${i + 1}`,
      })),
    }),
    (lightbox) => {
      lightbox.addFilter('thumbEl', (thumbEl) => {
        thumbEl.scrollIntoView({ behavior: 'instant', block: 'nearest' })
        return thumbEl
      })

      lightbox.addFilter('itemData', (itemData) => {
        const imageEl = itemData.element.querySelector<HTMLImageElement>('img[data-main-image]')
        if (imageEl) {
          // eslint-disable-next-line no-param-reassign
          itemData.msrc = imageEl.currentSrc
        }
        return itemData
      })
    },
  )

  return (
    <div ref={galleryRef} className='mb-12'>
      <div className='flex'>
        {screens.map(({ thumb }, i) => {
          const cls = `scr_thumb_${i}`
          const ratio = thumb.width / thumb.height
          return (
            <div
              key={i}
              ref={itemRef()}
              className={`flex-shrink-0 cursor-zoom mr-1.5 ${cls}`}
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
              <GatsbyImage image={thumb} alt={`Screen ${i + 1}`} className='rounded-md' />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Project(props: PageProps<Queries.ProjectQuery, { project: string }>) {
  const {
    data: { project },
    children,
    pageContext,
  } = props
  const { title, desc, hasImage } = project
  let seoTitle = title
  let noIndex = false
  const image = project.image.childImageSharp
  const seoImage = hasImage ? image.socialBanner : undefined
  const screens = [] as ProjectGalleryProps['screens']
  if (hasImage) screens.push(image)
  project.screens.forEach((screen) => {
    if (screen) screens.push(screen.childImageSharp)
  })

  if (project.categories.some(({ slug }) => slug === 'portfolio')) {
    seoTitle = `${project.title} (Case Study)`
    // Don't index portfolio projects
    noIndex = true
  }

  return (
    <PageLayout title={title} snippet={{ $comp: 'Project', id: pageContext.project }}>
      <PageHead title={seoTitle} description={desc} image={seoImage} noIndex={noIndex} />
      <Section>
        <Heading title={title} primary>
          {desc}.
        </Heading>
        {screens.length > 1 && <ProjectGallery screens={screens} />}
        <div className='grid md:grid-cols-3 gap-x-4 gap-y-8'>
          <ProjectSkill.Map data={project.skills}>
            {(items) => <Detail title='Skills'>{items}</Detail>}
          </ProjectSkill.Map>
          <NetworkHandle.Map data={project.handles}>
            {(items) => (
              <Detail title='Links' innerClassName='text-lg'>
                {items}
              </Detail>
            )}
            {({ title, href, Icon }, _i) => (
              <Link href={href} linkId='project_link' className='link mr-4 mb-1'>
                <Icon className='w-5 mr-2' />
                <span>{title}</span>
              </Link>
            )}
          </NetworkHandle.Map>
          <Detail title='Started' innerClassName='text-lg'>
            {project.started}
          </Detail>
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
    </PageLayout>
  )
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
          thumb: gatsbyImageData(height: 500, placeholder: BLURRED, quality: 100)
          full: gatsbyImageData(layout: FULL_WIDTH, formats: [AUTO], quality: 100)
        }
      }
      screens {
        childImageSharp {
          org: original {
            width
            height
          }
          thumb: gatsbyImageData(height: 500, placeholder: BLURRED, quality: 100)
          full: gatsbyImageData(layout: FULL_WIDTH, formats: [AUTO], quality: 100)
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
