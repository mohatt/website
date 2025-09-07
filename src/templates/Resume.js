import React from 'react'
import { graphql } from 'gatsby'
import { generatePath } from 'gatsby-plugin-advanced-pages'
import { site, resume, sortSkillsByTagGroups } from '../constants'
import { cx } from '../util'
import { useSiteMetadata } from '../hooks'
import { Page, Heading, Section, Link, Icon, Masonry } from '../components'
import { Contacts } from '../layouts/partials'
import { Testimonial } from './partials'

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

    function renderHeading(text, inline) {
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
      <div>
        <Section spacing={false} fill={isPrint} sep={false}>
          <Heading title='Mohamed Elkholy' primary className={isPrint ? 'font-medium' : ''}>
            Full-Stack Engineer {!isPrint && `· ${site.location}`}
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
              {({ id, href, Icon }) => (
                <li key={id}>
                  <Link className='link' to={href} external='resume_contact'>
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
          <div className={!isPrint ? 'max-w-4xl text-xl' : ''}>
            Full-stack engineer with over <b>8 years</b> delivering web applications for startups
            and SMBs, focused on performance, reliability, maintainability, and developer
            experience. Build scalable <b>TypeScript</b>, <b>Node.js</b>, and <b>React</b> solutions
            on <b>GCP</b> and <b>AWS</b>.
          </div>
        </Section>
        <Section id='experience' sep={isPrint}>
          <Heading title='Experience' />
          <div className={cx(isPrint ? 'space-y-4' : 'space-y-8')}>
            {resume.experience.map(
              ({
                role,
                at,
                type,
                url,
                time,
                loc,
                desc,
                printDesc,
                testimonial,
                hidden,
                legacy,
              }) => {
                if (hidden === true || (isPrint && hidden === 'print')) {
                  return null
                }
                const bullets = isPrint ? (printDesc ?? desc) : desc
                const collapsed = isPrint && legacy
                return (
                  <div key={at} className={cx(isPrint ? 'page-break-avoid' : 'max-w-5xl')}>
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
                              <Link className='link' to={url} external='resume_role'>
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
                            <Link className='link' to={url} external='resume_role'>
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
                    {bullets?.length > 0 && !collapsed && (
                      <ul className='list-style-diamond ml-1 mt-3 space-y-1'>
                        {bullets.map((text) => (
                          <li key={text}>{text}</li>
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
            {[
              ['Soft Skills & Practices', resume.softSkills],
              ['Tech stack', skills.first],
              ['Also used', skills.second],
            ].map(([title, nodes]) => (
              <div key={title} className={!isPrint ? 'max-w-4xl' : ''}>
                {renderHeading(`${title}: `, true)}
                {nodes.map((skill) => skill.title ?? skill).join(', ')}
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
                      <Link className='link' to={url} external='resume_edu'>
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
