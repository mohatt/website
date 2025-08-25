import React from 'react'
import { graphql } from 'gatsby'
import { generatePath } from 'gatsby-plugin-advanced-pages'
import { skillTagGroups } from '../constants'
import { cx } from '../util'
import { useSiteMetadata } from '../hooks'
import { Page, Heading, Section, Link, Icon, Masonry } from '../components'
import { Contacts } from '../layouts/partials'
import { ProjectSkill, Testimonial } from './partials'

const experience = [
  {
    title: 'Full-Stack Software Engineer',
    at: 'Freelance (Self employed)',
    time: '2014 — Present',
    loc: 'Remote',
    desc: [
      'Delivered end-to-end web apps for startups and SMBs—from microsites and MVPs to large web applications using different technology stacks.',
      'Designed application-focused cloud architectures on AWS, GCP, and Firebase—serverless-first with managed services—for scalable, low-ops, cost-efficient delivery.',
      'Built React/Angular apps and Node.js/TypeScript back ends (serverless and microservices); integrated third-party APIs, auth, payments, AI, and webhooks.',
      'Established CI/CD pipelines and automated unit and E2E testing (GitHub Actions; Jest/Vitest, Cypress/Playwright) to ship predictably and reduce regressions.',
      'Provided technical consulting—architecture/code reviews, tool selection, performance audits, and developer-workflow improvements.',
      'Built reusable packages, component libraries, and internal tooling to standardize quality and shorten delivery cycles.',
    ]
  },
  {
    title: 'Full-Stack Software Engineer (Node.js/TypeScript)',
    at: 'Mishe',
    url: 'https://mishe.co',
    time: '2024 — 2025',
    loc: 'United States (Remote)',
    desc: [
      'Modernized a legacy codebase: upgraded Node.js (web and Cloud Functions) to LTS, updated dependencies, removed obsolete code, and improved repo structure and DX.',
      'Migrated the internal dashboard to Material UI; built reusable components, standardized UI patterns, and shipped some new features.',
      'Brought order to Firestore data with a custom collection schema/usage analyzer and a dashboard-driven migration system integrated into CI/CD with full logging.',
      'Built Stripe dashboards for charges, refunds, transfers, and payouts with flow-specific rules and reconciliation, improving operational visibility.',
      'Set up CI/CD with GitHub Actions and Google Cloud Build: PR checks, staged deployments, and in-dashboard deployment/migration logs.',
      'Quality and reliability: automated unit and E2E tests on PRs; structured logging and observability; caching and load tests to keep responses fast.',
    ]
  },
  {
    title: 'Full-Stack Software Engineer (Node.js/TypeScript)',
    at: 'JOKR',
    url: 'https://www.jokr.com',
    time: '2021 — 2024',
    loc: 'United States (Remote)',
    desc: [
      'Owned NestJS/GraphQL microservices within an Apollo Federation supergraph for the grocery app; shipped features end to end (schema, resolvers, data layer, releases, monitoring).',
      'Built internal React/MUI dashboards and reusable component libraries, streamlining data operations and speeding delivery.',
      'Built an AI-powered product recommendations service using signals such as order history, category affinity, and declared interests; integrated into GraphQL API and internal dashboards.',
      'Improved performance via DataLoader caching and batching, pagination, optimized media delivery, and targeted load testing; sustained thousands of requests/min with low latency.',
      'Set up CI/CD with GitHub Actions and Terraform: PR preview environments and Docker/Kubernetes/Helm deployments across staging and production.',
      'Quality and reliability: 90%+ automated test coverage (Jest/Cypress); Datadog observability and runbooks reduced MTTR; Auth0/JWT hardened access controls.',
    ]
  },
  {
    title: 'Full-Stack Software Engineer (PHP/Wordpress)',
    at: 'Point Hacks',
    url: 'https://pointhacks.com.au',
    time: '2016 — 2018',
    loc: 'Australia (Remote)',
    desc: [
      'Developed and maintained the main website and its REST API.',
      'Implemented headless WordPress with the WP REST API.',
      'Added Redis server-assisted client-side caching to improve performance.',
      'Configured NGINX load balancing to handle up to 30,000 concurrent requests.',
      'Shipped new user-facing features and improved existing ones.',
    ]
  },
  {
    title: 'Full-Stack Software Engineer (PHP/Symfony)',
    at: 'Dimentians',
    url: 'https://dimentians.com',
    time: '2014 — 2016',
    loc: 'Canada (Remote)',
    desc: [
      'Maintained ongoing projects and launched new ones within an Agile team.',
      'Built multiple web apps using PHP and the Symfony framework.',
      'Developed internal apps and microservices on PHP back ends.',
      'Created custom WordPress plugins/themes and resolved configuration/upgrade issues.',
      'Translated wireframes and UX flows into functional, accessible interfaces.',
    ]
  },
  {
    title: 'Back-End Engineer (PHP/WordPress)',
    at: 'Axis Digital Solutions',
    url: 'https://axsisnet.com/?lang=en',
    time: '2012 — 2014',
    loc: 'Egypt',
    desc: [
      'Led project development with a small cross-functional team (intern + designer).',
      'Built and maintained client websites (both CMS-driven and custom).',
      'Developed a web service for ingesting and storing social-network data.',
      'Implemented and maintained LAMP environments across multiple hosts.',
    ]
  },
  {
    title: 'Back-End Engineer (PHP/MySQL)',
    at: 'Queen Tech Solutions',
    url: 'https://queentechsolutions.net',
    time: '2010 — 2012',
    loc: 'Egypt',
    desc: [
      'Built dynamic websites and apps using PHP/MySQL.',
      'Implemented CMS solutions with Joomla and WordPress.',
      'Accelerated delivery with MVC frameworks (CodeIgniter, CakePHP).',
      'Wrote maintainable, standards-compliant code following best practices.',
    ],
  },
]

function ProjectsCategoryLink({ id, outbound }) {
  const { deployment } = useSiteMetadata()
  const path = generatePath('projects.category', {
    category: id
  })
  const url = deployment.config.url + path
  return <Link className='link' to={url} external>{url}</Link>
}

export default class Resume extends Page {
  view() {
    const { isPrint, setPrintLayout } = this.context
    const { page: { title }, skills, tests } = this.props.data
    this.title = title
    this.snippet.$comp = 'Resume'
    this.actions = (
      <>
        <a className='link' href='/resume.pdf' title='Download Resume'>
          <Icon name='download' className='w-5 mr-1' />
        </a>
        <a className='link ml-2 hidden lg:inline' onClick={() => setPrintLayout(true)} title='Print Preview'>
          <Icon name='print' className='w-5 mr-1' />
        </a>
      </>
    )

    return (
      <div>
        <Section spacing={false}>
          <Heading title='Mohamed Elkholy' primary>
            Full-Stack Software Engineer
          </Heading>
        </Section>
        <Section spacing={false}>
          <Heading title='About' className=''>
            Full-stack software engineer specializing in <b>Node.js</b>, <b>TypeScript</b>, and <b>GraphQL</b>, with modern front-end expertise in <b>React</b> and <b>Angular</b>.
            Over <b>8 years</b> of delivering production web applications from <b>UI</b> to <b>APIs</b> and <b>CI/CD</b>, with a focus on performance, reliability, maintainability, and developer experience.
            Open-source contributor, driven by a passion for building software.
          </Heading>
        </Section>
        <Section id='experience'>
          <Heading title='Experience'>
            From 2010 to present.
          </Heading>
          <div className={cx(isPrint ? 'space-y-4' : 'space-y-8')}>
            {experience.map(({ title, at, url, time, loc, desc }) => (
              <div key={at} className='page-break-avoid xl:max-w-3xl'>
                <h3 className='font-body text-lg text-primary'>{title}</h3>
                <div className='font-medium'>
                  {url ? <Link className='link' to={url} external='resume_comp'>{at}</Link> : at} · {time} · {loc}
                </div>
                {desc.length ? (
                  <ul className='list-style-diamond ml-2 mt-3 space-y-1'>
                    {desc.map(text => <li key={text}>{text}</li>)}
                  </ul>
                ) : desc}
              </div>
            ))}
          </div>
        </Section>
        <Section id='skills'>
          <Heading title='Skills'>
            Tech Stacks and Tools — Past and Present.
          </Heading>
          <div className={cx(isPrint ? 'space-y-4' : 'space-y-8')}>
            <div>
              <h3 className='font-body text-lg text-primary'>Soft Skills & Practices</h3>
              <ul className='grid list-style-diamond ml-2 mt-2 gap-2'>
                <li>Problem-solving · Decision-making · Systems thinking · Communication · Organization</li>
                <li>Test-driven development (TDD) · Code reviews · Clean architecture · Documentation</li>
              </ul>
            </div>
            {skillTagGroups.map(({ id, title, desc, tag, tags }) => (
              <div key={id} className='page-break-avoid'>
                <div className='xl:max-w-3xl'>
                  <h3 className='font-body text-lg text-primary inline'>{title}</h3> — {desc}
                </div>
                <ul className='list-style-diamond ml-2 mt-2 space-y-1'>
                  {tags.map(({ id, title }) => (
                    <ProjectSkill.Map key={id} data={skills.nodes} tags={[tag, id]}>
                      {items => (
                        <li>
                          <a className='inline-block mr-2 font-medium'>{title}:</a>
                          {items}
                        </li>
                      )}
                      {skill => (
                        <a className='inline-block after:content-["·"] after:px-1 last:after:content-[""]'>
                          {skill.title}
                        </a>
                      )}
                    </ProjectSkill.Map>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
        <Section id='education' className='page-break'>
          <Heading title='Education'>
            Formal degree with self-directed CS foundation and ongoing coursework.
          </Heading>
          <div className={cx(isPrint ? 'space-y-4' : 'space-y-8')}>
            <div>
              <h3 className='font-body text-lg text-primary'>Misr University for Science and Technology</h3>
              <div>Bachelor's degree, Physical Therapy</div>
              <div>2010 – 2016</div>
            </div>
            <div>
              <h3 className='font-body text-lg text-primary'>
                <Link className='link' to='https://www.edx.org/course/introduction-computer-science-harvardx-cs50x' external='resume_edu'>
                  CS50x — HarvardX / edX
                </Link>
              </h3>
              <div>Online education programme of Harvard University</div>
              <div>C · Python · SQL · Algorithms · Data Structures</div>
              <div>2016 – 2017</div>
            </div>
            <div>
              <h3 className='font-body text-lg text-primary'>Other relevant course work</h3>
              <div>Various online education programmes</div>
              <div>GraphQL Essentials (2020) · Advanced React (2018) · Advanced JavaScript (2018) · PHP Design Patterns (2015)</div>
              <div>2015 – Present</div>
            </div>
          </div>
        </Section>
        {isPrint && (
          <>
          <Section>
            <Heading title='Portfolio'>
              A few projects I’ve worked on; details on my website.
            </Heading>
            <div className='space-y-4'>
              <div>
                <h3 className='font-body text-lg text-primary inline'>Selected Projects</h3> — Production apps for clients and employers.
                <div><ProjectsCategoryLink id='portfolio' /></div>
              </div>
              <div>
                <h3 className='font-body text-lg text-primary inline'>Open Source</h3> — Community projects and packages I maintain.
                <div><ProjectsCategoryLink id='open-source' /></div>
              </div>
            </div>
          </Section>
          <Section className='grid grid-cols-2' fill sep>
            <div>
              <h3 className='font-body uppercase text-lg text-primary'>Interests</h3>
              <ul className='list-style-diamond ml-2 mt-4 space-y-2'>
                <li>Open Source</li>
                <li>Web performance</li>
                <li>Blockchain and Web3</li>
                <li>Health and fitness</li>
                <li>Running and strength training</li>
              </ul>
            </div>
            <Contacts homepage phone>
              {items => (
                <div>
                  <h3 className='font-body uppercase text-lg text-primary'>Contacts</h3>
                  <ul className='ml-2 mt-4 space-y-2'>{items}</ul>
                </div>
              )}
              {({ id, href, Icon }) => (
                <li key={id}>
                  <Link className='link' to={href} external='resume_contact'>
                    <Icon className='h-5 mr-1'/>
                    <span>{href}</span>
                  </Link>
                </li>
              )}
            </Contacts>
          </Section>
          </>
        )}
        <Section id='testimonials' className='page-break'>
          <Heading title='Testimonials'>
            What clients and colleagues say{isPrint && <span className='italic'> (references available on request)</span>}.
          </Heading>
          <Testimonial.Map data={tests.nodes}>
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

    skills: allProjectSkill {
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
