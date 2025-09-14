import type { ReactNode } from 'react'
import { graphql, PageProps } from 'gatsby'
import { generatePath, RouteParams } from 'gatsby-plugin-advanced-pages'
import { site, resume, sortSkillsByTagGroups } from '../constants'
import { cx } from '../util'
import { useLayout } from '../hooks'
import { PageHead, PageLayout } from '../layouts/page'
import { Contacts, Heading, Section, Link, Icon, Masonry } from '../components'
import { Testimonial } from './partials'

interface PrintLinkProps {
  to: string
  params?: RouteParams
  children?: ReactNode
}

function PrintLink({ to, params, children }: PrintLinkProps) {
  const path = generatePath(to, params)
  const url = site.deployment.url + path
  return (
    <Link href={url} linkId='resume_print' className='link'>
      {children ?? url}
    </Link>
  )
}

export default function Resume({ data }: PageProps<Queries.ResumeQuery>) {
  const { isPrint, setLayout } = useLayout()
  const {
    page: { title },
    firstSkills,
    secondSkills,
    tests,
  } = data
  const actions = (
    <>
      <a className='link' href='/resume.pdf' title='Download Resume'>
        <Icon name='download' className='w-5 mr-1' />
      </a>
      <a
        className='link ml-2 hidden lg:inline'
        onClick={() => setLayout('print')}
        title='Print Preview'
      >
        <Icon name='print' className='w-5 mr-1' />
      </a>
    </>
  )
  const skillsSections = [
    { title: 'Soft Skills & Practices', skills: resume.softSkills },
    {
      title: 'Tech stack',
      skills: sortSkillsByTagGroups(firstSkills.nodes, ['deploy', 'ci', 'test']),
    },
    {
      title: 'Also used',
      skills: sortSkillsByTagGroups(secondSkills.nodes, ['deploy', 'ci', 'test']),
    },
  ] as const

  function subtitleProps(subtitle) {
    if (isPrint) {
      return { end: subtitle }
    }
    return { children: subtitle }
  }

  function renderHeading(text: ReactNode, inline = false) {
    return (
      <h3
        className={cx(
          'font-body text-lg',
          inline && 'inline',
          isPrint ? 'text-typo font-bold [&_a]:font-bold' : 'text-primary',
        )}
      >
        {text}
      </h3>
    )
  }

  return (
    <PageLayout title={title} snippet={{ $comp: 'Resume' }} actions={actions}>
      <PageHead title={title} />
      <Section spacing={false} fill={isPrint} sep={false}>
        <Heading title={resume.name} primary className={isPrint ? 'font-medium' : ''}>
          {resume.role} · {resume.employmentType} {!isPrint && `· ${site.location}`}
        </Heading>
        {isPrint && (
          <Contacts homepage phone>
            {(items) => (
              <div>
                <ul className='space-y-3 columns-3'>
                  <li>
                    <span className='inline-block font-medium'>
                      <Icon name='map-pin' className='h-5 mr-2' />
                      <span>{site.location}</span>
                    </span>
                  </li>
                  {items}
                </ul>
              </div>
            )}
            {({ id, href, Icon }, _i) => (
              <li key={id}>
                <Link href={href} linkId='resume_contact' className='link'>
                  <Icon className='h-5 mr-2' />
                  <span>{href.replace(/^(mailto|tel):(\/\/)?/, '')}</span>
                </Link>
              </li>
            )}
          </Contacts>
        )}
      </Section>
      <Section sep={isPrint}>
        {isPrint && <Heading title='Summary' />}
        <div className={!isPrint ? 'max-w-4xl text-xl' : ''}>{resume.intro}</div>
      </Section>
      <Section id='experience' sep={isPrint}>
        <Heading title='Experience' />
        <div className={cx(isPrint ? 'space-y-4' : 'space-y-8')}>
          {resume.experience.map(
            ({ role, at, type, url, time, loc, desc, testimonial, hidden, legacy }) => {
              if (hidden === true || (isPrint && hidden === 'print')) {
                return null
              }
              const collapsed = isPrint && legacy
              const bullets = collapsed ? null : desc
              return (
                <div key={String(time)} className={cx(isPrint ? 'page-break-avoid' : 'max-w-5xl')}>
                  <div className={isPrint ? 'flex items-center text-typo-dim' : ''}>
                    {renderHeading(
                      <>
                        {role}
                        {isPrint && <>, &nbsp;</>}
                      </>,
                    )}
                    {isPrint ? (
                      <>
                        <div className='flex-grow'>
                          {url ? (
                            <Link href={url} linkId='resume_role' className='link'>
                              {at}
                            </Link>
                          ) : (
                            at && <span className='font-medium'>{at}</span>
                          )}{' '}
                          {at && '· '}
                          {type} · {loc}
                        </div>
                        <div>{time.join(' – ')}</div>
                      </>
                    ) : (
                      <div className='font-medium'>
                        {url ? (
                          <Link href={url} linkId='resume_role' className='link'>
                            {at}
                          </Link>
                        ) : (
                          at
                        )}{' '}
                        {at && '· '}
                        {type} · {loc} · {time.join(' – ')}
                      </div>
                    )}
                  </div>
                  {bullets?.length > 0 && (
                    <ul className='list-style-diamond ml-1 mt-3 space-y-1'>
                      {bullets.map((text, i) => (
                        <li key={i}>{text}</li>
                      ))}
                      {testimonial && isPrint && (
                        <li className='list-none -ml-3 pt-2'>
                          <blockquote>"{testimonial.quote}"</blockquote>
                          <div className='font-bold'>
                            {'— '}
                            {testimonial.name && <span>{testimonial.name}, </span>}
                            <span className='font-medium'>{testimonial.role}</span>
                          </div>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              )
            },
          )}
        </div>
      </Section>
      <Section id='skills' sep={isPrint} pageBreak>
        <Heading title='Skills' />
        <div className={cx(isPrint ? 'space-y-4' : 'space-y-8')}>
          {skillsSections.map(({ title, skills }) => (
            <div key={title} className={!isPrint ? 'max-w-4xl' : ''}>
              {renderHeading(`${title}: `, true)}
              {skills
                .map((sk: (typeof skills)[0]) => (typeof sk === 'string' ? sk : sk.title))
                .join(', ')}
            </div>
          ))}
        </div>
      </Section>
      <Section id='education' sep={isPrint}>
        <Heading
          title='Education'
          {...subtitleProps(
            <div className='text-typo-dim'>
              Formal degree with self-directed CS foundation and ongoing coursework
            </div>,
          )}
        />
        <div className={cx(isPrint ? 'space-y-4' : 'space-y-8')}>
          {resume.education.map(({ title, subtitle, time, url, desc }) => (
            <div key={title}>
              <div className={isPrint ? 'flex items-center' : ''}>
                {renderHeading(
                  url ? (
                    <Link href={url} linkId='resume_edu' className='link'>
                      {title}
                    </Link>
                  ) : (
                    title
                  ),
                )}
                {isPrint ? (
                  <>
                    <div className='font-medium text-typo-dim flex-grow'>&nbsp;· {subtitle}</div>
                    <div className='text-typo-dim'>{time.join(' – ')}</div>
                  </>
                ) : (
                  <div className='font-medium'>
                    {subtitle} · {time.join(' – ')}
                  </div>
                )}
              </div>
              <div className='mt-1'>{desc}</div>
            </div>
          ))}
        </div>
      </Section>
      {isPrint && (
        <>
          <Section sep>
            <Heading title='Featured project' />
            <div>
              {renderHeading(
                <PrintLink to='projects.project' params={{ project: 'jokr' }}>
                  JOKR — Smart grocery shopping app powered by AI
                </PrintLink>,
                true,
              )}
              <ul className='list-style-diamond ml-1 mt-2 space-y-1'>
                <li>
                  <span className='font-bold'>Stack:</span> TypeScript/Node.js (NestJS), GraphQL
                  (Apollo Federation), React/MUI, GCP, Docker/Kubernetes, Jest/Cypress.
                </li>
                <li>Delivered federated GraphQL microservices powering the iOS/Android app.</li>
                <li>Built internal operations dashboards and CI/CD pipelines.</li>
                <li>Integrated AI-driven product recommendations with guardrails.</li>
                <li>
                  <span className='font-medium'>Case study:</span>{' '}
                  <PrintLink to='projects.project' params={{ project: 'jokr' }} />
                </li>
              </ul>
            </div>
          </Section>
        </>
      )}
      {!isPrint && (
        <Section id='testimonials'>
          <Heading title='Testimonials'>What clients and colleagues say</Heading>
          <Testimonial.Map data={tests.nodes}>
            {(items) => <Masonry cols={{ default: 2, 1280: 1 }}>{items}</Masonry>}
          </Testimonial.Map>
        </Section>
      )}
    </PageLayout>
  )
}

export const query = graphql`
  query Resume($id: String!) {
    page(id: { eq: $id }) {
      title
    }

    firstSkills: allProjectSkill(filter: { tags: { eq: "1st" } }) {
      nodes {
        ...ProjectSkill
        tags
      }
    }

    secondSkills: allProjectSkill(filter: { tags: { eq: "2nd" } }) {
      nodes {
        ...ProjectSkill
        tags
      }
    }

    tests: allTestimonial(sort: [{ priority: DESC }, { received: DESC }], limit: 10) {
      nodes {
        ...Testimonial
      }
    }
  }
`
