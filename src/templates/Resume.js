import React from 'react'
import { graphql } from 'gatsby'
import { generatePath } from 'gatsby-plugin-advanced-pages'
import { site, resume, sortSkillsByTagGroups } from '../constants'
import { cx } from '../util'
import { useSiteMetadata } from '../hooks'
import { Page, Heading, Section, Link, Icon, Masonry } from '../components'
import { Contacts } from '../layouts/partials'
import { Testimonial } from './partials'
import JokrLogo from '../../content/project/jokr/logo.jpg'

function PrintLink({ to, params, children }) {
  const { deployment } = useSiteMetadata()
  const path = generatePath(to, params)
  const url = deployment.config.url + path
  return (
    <Link className='link' to={url} external='resume_print'>
      {children ?? url}
    </Link>
  )
}

export default class Resume extends Page {
  view() {
    const { isPrint, setPrintLayout } = this.context
    const {
      page: { title },
      firstSkills,
      secondSkills,
      tests,
    } = this.props.data
    this.title = title
    this.snippet.$comp = 'Resume'
    this.actions = (
      <>
        <a className='link' href='/resume.pdf' title='Download Resume'>
          <Icon name='download' className='w-5 mr-1' />
        </a>
        <a
          className='link ml-2 hidden lg:inline'
          onClick={() => setPrintLayout(true)}
          title='Print Preview'
        >
          <Icon name='print' className='w-5 mr-1' />
        </a>
      </>
    )
    const skills = {
      first: sortSkillsByTagGroups(firstSkills.nodes, ['deploy', 'ci', 'test']),
      second: sortSkillsByTagGroups(secondSkills.nodes, ['deploy', 'ci', 'test']),
    }

    function subtitleProps(subtitle) {
      if (isPrint) {
        return { endChildren: subtitle }
      }
      return { children: subtitle }
    }

    return (
      <div>
        <Section spacing={false}>
          <Heading title='Mohamed Elkholy' primary className={isPrint && 'pl-4'}>
            Full-Stack Engineer · {site.location}
          </Heading>
        </Section>
        {isPrint && (
          <Section className='grid' fill sep>
            <Contacts homepage phone>
              {(items) => (
                <div>
                  <ul className='space-y-3 columns-3'>
                    <li>
                      <span className='inline-block font-medium'>
                        <Icon name='map-pin' className='h-5 mr-1' />
                        <span>{site.location}</span>
                      </span>
                    </li>
                    {items}
                  </ul>
                </div>
              )}
              {({ id, href, Icon }) => (
                <li key={id}>
                  <Link className='link' to={href} external='resume_contact'>
                    <Icon className='h-5 mr-1' />
                    <span>{href}</span>
                  </Link>
                </li>
              )}
            </Contacts>
          </Section>
        )}
        <Section>
          <Heading>
            Full-stack engineer specializing in <b>Node.js</b>, <b>TypeScript</b>, and{' '}
            <b>GraphQL</b>, with front-end expertise in <b>React</b> and <b>Angular</b>. Over{' '}
            <b>8 years</b> of delivering production web apps from <b>UI</b> to <b>APIs</b> and{' '}
            <b>CI/CD</b>, with a focus on performance, reliability, maintainability, and developer
            experience. Open-source contributor, passionate about building software.
          </Heading>
          <b>Highlights:</b>
          <ul className='list-style-diamond ml-2 space-y-1 mt-2'>
            <li>Owned GraphQL services in an Apollo-federated supergraph for a high-traffic consumer app.</li>
            <li>
              Integrated an AI-powered product-recommendation service into a grocery delivery app.
            </li>
            <li>
              Built Stripe operations dashboards (charges, refunds, transfers, payouts) with
              reconciliation.
            </li>
            <li>Scaled web apps/back ends to thousands of requests per minute with low latency.</li>
          </ul>
        </Section>
        <Section id='experience'>
          <Heading
            title='Experience'
            {...subtitleProps(
              isPrint && (
                <>
                  See full history:&nbsp;
                  <PrintLink to='resume' />
                </>
              ),
            )}
          />
          <div className={cx(isPrint ? 'space-y-4' : 'space-y-8')}>
            {resume.experience.map(
              ({ role, at, type, url, time, loc, print, desc, printDesc, legacy }) => {
                if (isPrint && !print) {
                  return null
                }
                const bullets = isPrint ? (printDesc ?? desc) : desc
                const collapsed = isPrint && legacy
                return (
                  <div key={at} className={cx(isPrint ? 'page-break-avoid' : 'max-w-4xl')}>
                    <div className={isPrint ? 'flex items-center' : ''}>
                      <h3 className='font-body text-lg text-primary'>{role}</h3>
                      {isPrint ? (
                        <>
                          <div className='font-medium flex-grow'>
                            &nbsp;—{' '}
                            {url ? (
                              <Link className='link' to={url} external='resume_role'>
                                {at}
                              </Link>
                            ) : (
                              at
                            )}{' '}
                            · {type} · {loc}
                          </div>
                          <div>{time}</div>
                        </>
                      ) : (
                        <div className='font-medium'>
                          {url ? (
                            <Link className='link' to={url} external='resume_role'>
                              {at}
                            </Link>
                          ) : (
                            at
                          )}{' '}
                          · {type} · {loc} · {time}
                        </div>
                      )}
                    </div>
                    {bullets?.length > 0 && !collapsed && (
                      <ul className='list-style-diamond ml-2 mt-3 space-y-1'>
                        {bullets.map((text) => (
                          <li key={text}>{text}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              },
            )}
          </div>
        </Section>
        <Section id='skills' className='print:page-break print:mt-6'>
          <Heading
            title='Skills'
            {...subtitleProps(
              isPrint && (
                <>
                  See full list:&nbsp;
                  <PrintLink to='skills' />
                </>
              ),
            )}
          />
          <div className={cx(isPrint ? 'space-y-4' : 'space-y-8')}>
            <div className={!isPrint && 'max-w-3xl'}>
              <h3 className='font-body text-lg text-primary inline'>Soft Skills & Practices</h3> —
              Problem-solving · Decision-making · Systems thinking · Communication · Organization ·
              Test-driven development (TDD) · Code reviews · Clean architecture · Documentation
            </div>
            {[
              ['Recently used', skills.first],
              ['Also used', skills.second],
            ].map(([title, nodes]) => (
              <div key={title} className={!isPrint && 'max-w-3xl'}>
                <h3 className='font-body text-lg text-primary inline'>{title}</h3> —{' '}
                {nodes.map((skill) => skill.title).join(' · ')}
              </div>
            ))}
          </div>
        </Section>
        <Section id='education'>
          <Heading
            title='Education'
            {...subtitleProps(
              'Formal degree with self-directed CS foundation and ongoing coursework',
            )}
          />
          <div className={cx(isPrint ? 'space-y-4' : 'space-y-8')}>
            {resume.education.map(({ title, subtitle, time, url, desc }) => (
              <div key={title}>
                <div className={isPrint ? 'flex items-center' : ''}>
                  <h3 className='font-body text-lg text-primary'>
                    {url ? (
                      <Link className='link' to={url} external='resume_edu'>
                        {title}
                      </Link>
                    ) : (
                      title
                    )}
                  </h3>
                  {isPrint ? (
                    <>
                      <div className='font-medium flex-grow'>&nbsp;— {subtitle}</div>
                      <div>{time}</div>
                    </>
                  ) : (
                    <div className='font-medium'>
                      {subtitle} · {time}
                    </div>
                  )}
                </div>
                <div>{desc}</div>
              </div>
            ))}
          </div>
        </Section>
        {isPrint && (
          <>
            <Section>
              <Heading
                title='Portfolio'
                {...subtitleProps(
                  <>
                    See more projects:&nbsp;
                    <PrintLink to='projects' />
                  </>,
                )}
              />
              <div className='space-y-4'>
                <div className='flex items-start'>
                  <img
                    alt='JOKR logo'
                    src={JokrLogo}
                    width={96}
                    height={96}
                    className='border-2 border-primary rounded-md'
                  />
                  <div className='flex-grow ml-4 flex flex-col justify-between h-[92px]'>
                    <h3 className='font-body text-lg text-primary inline'>
                      <PrintLink to='projects.project' params={{ project: 'jokr' }}>
                        JOKR — Smart grocery shopping powered by AI
                      </PrintLink>
                    </h3>
                    <div>
                      Federated GraphQL platform + AI recommendations for a fast grocery delivery
                      startup.
                    </div>
                    <div>
                      React/MUI dashboards; Datadog observability; high-throughput, low-latency
                      GraphQL.
                    </div>
                    <div>
                      Case study: <PrintLink to='projects.project' params={{ project: 'jokr' }} />
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </>
        )}
        <Section id='testimonials'>
          <Heading
            title='Testimonials'
            {...subtitleProps(
              <>
                What clients and colleagues say
                {isPrint && <span className='italic'>&nbsp;(references available on request)</span>}
              </>,
            )}
          />
          <Testimonial.Map data={isPrint ? tests.nodes.slice(0, 4) : tests.nodes}>
            {(items) => <Masonry cols={{ default: 2, 1280: 1 }}>{items}</Masonry>}
          </Testimonial.Map>
        </Section>
      </div>
    )
  }
}

export const query = graphql`
  query Resume($id: String!) {
    page(id: { eq: $id }) {
      title
    }

    firstSkills: allProjectSkill(filter: { tags: { eq: "1st" } }) {
      nodes {
        ...ProjectSkillFragment
        tags
      }
    }

    secondSkills: allProjectSkill(filter: { tags: { eq: "2nd" } }) {
      nodes {
        ...ProjectSkillFragment
        tags
      }
    }

    tests: allTestimonial(sort: [{ priority: DESC }, { received: DESC }], limit: 10) {
      nodes {
        ...TestimonialFragment
      }
    }
  }
`
