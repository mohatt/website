import React from 'react'
import { graphql } from 'gatsby'
import { generatePath } from 'gatsby-plugin-advanced-pages'
import { skillTagGroups } from '../constants'
import { cx } from '../util'
import { useSiteMetadata } from '../hooks'
import { Page, Heading, Section, Link, Icon } from '../components'
import { Contacts } from '../layouts/partials'
import { ProjectSkill, Testimonial } from './partials'
import resumePDF from '../documents/resume.pdf'

const experience = [
  {
    title: 'Freelance Web Developer',
    at: 'Self Employed',
    time: '2015 — Present',
    desc: [
      'Working on projects of different scales — from small micro-sites to larger web applications, using different technology stacks.',
      'Designing and implementing infrastructure solutions using modern technologies, as well as delivering consultations, products recommendation, and technical support to IT Lands’ clients.',
      'Developed new procedures for requirements gathering, needs analysis, testing, ci/cd pipelines and documentation to strengthen quality and functionality of business-critical applications.',
      'Built reusable code and libraries to accelerate development cycles.',
      'Developed a team management module for a CRM system in PHP that helped managers to assign members and keep track of their performance by using comprehensive dashboards and reports.',
    ]
  },
  {
    title: 'Full Stack Developer',
    at: 'Point Hacks',
    url: 'https://pointhacks.com.au',
    time: '2016 — 2018',
    desc: [
      'Developed and maintained Point Hacks main website as well as their REST API service.',
      'Developed new user-facing features and improved existing one.',
      'Worked with WordPress as a headless CMS using GraphQL and REST APIs.',
      'Implemented Redis server-assisted client side caching to improve performance.',
      'Used Nginx for load balancing, processing a large number of requests up to 30,000 simultaneously.',
    ]
  },
  {
    title: 'Full Stack Developer',
    at: 'Dimentians',
    url: 'https://dimentians.com',
    time: '2014 — 2016',
    desc: [
      'Maintained ongoing web-based projects and launched new ones as part of the development team.',
      'Built a number of web apps using PHP and Symfony framework.',
      'Developed several internal apps and microservices built on PHP backends.',
      'Developed custom Wordpress plugins and themes and resolved configuration and updates issues.',
      'Translated wireframes, UX flows and content into functional and engaging interfaces.',
    ]
  },
  {
    title: 'Web Developer & Tech Lead',
    at: 'Axis Digital Solutions',
    url: 'https://axsisnet.com/?lang=en',
    time: '2012 — 2014',
    desc: [
      'Led a small team of developers and designers.',
      'Developed and maintained websites for dozens of clients, ranging from CMS-built to bespoke websites from the ground up.',
      'Attended client meetings to discuss their business goals and milestones, maintained hosting environments.',
    ]
  },
  {
    title: 'Web Developer',
    at: 'Queen Tech Solutions',
    url: 'https://queentechsolutions.net',
    time: '2010 — 2012',
    desc: [
      'Built several dynamic websites and applications from scratch using PHP/MySQL.',
      'Implemented content management solutions using Joomla and Wordpress.',
      'Accelerated development cycles with MVC frameworks such as CodeIgniter and CakePHP.',
      'Produced clear, well-commented code conforming to PHP standards and best practises.',
    ],
  },
]

function stripUrlProto(url) {
  return url.replace(/^[a-z]+:(\/\/)?/, '')
}

function ProjectsCategoryLink({ id, outbound }) {
  const { deployment } = useSiteMetadata()
  const path = generatePath('projects.category', {
    category: id
  })
  const url = deployment.config.url + path
  return <Link className='link' to={outbound ? url : path} external={outbound}>{stripUrlProto(url)}</Link>
}

export default class Resume extends Page {
  view() {
    const { isPrint, setPrintLayout } = this.context
    const { page: { title }, skills, tests } = this.props.data
    this.title = title
    this.snippet.$comp = 'Resume'
    this.actions = (
      <>
        <a className='link' href={resumePDF} title='Download Resume'>
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
            Full stack web developer
          </Heading>
        </Section>
        <Section spacing={false}>
          <Heading title='About'>
            Full stack web developer with a strong focus on PHP, TypeScript and Node.js.
            I’ve been doing web development stuff for over 8+ years now, that includes full time and freelance work.
            I live with a passion for software engineering, particularly in the world of architecture, functional development, and enhancing developer productivity.
            I enjoy working on new frameworks and libraries on my own time and have a fairly active Github profile.
          </Heading>
        </Section>
        <Section id='experience'>
          <Heading title='Experience'>
            From 2010 to present.
          </Heading>
          <div className={cx(isPrint ? 'space-y-4' : 'space-y-8')}>
            {experience.map(({ title, at, url, time, loc, desc }) => (
              <div key={at} className='page-break-avoid xl:max-w-3xl'>
                <h3 className='font-body uppercase text-lg text-primary'>{title}</h3>
                <div className='font-medium'>
                  {url ? <Link className='link' to={url} external='resume_comp'>{at}</Link> : at} | {time}
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
            Technologies I use in everyday work.
          </Heading>
          <div className={cx(isPrint ? 'space-y-4' : 'space-y-8')}>
            <div>
              <h3 className='font-body uppercase text-lg text-primary'>Soft Skills</h3>
              <ul className='list-style-diamond ml-2 mt-2 space-y-1'>
                <li>Problem Solving</li>
                <li>Decision-making</li>
                <li>Systematic Thinking</li>
                <li>Organizational Skills</li>
                <li>Brainstorming</li>
              </ul>
            </div>
            {skillTagGroups.map(({ id, title, desc, tag, tags }) => (
              <div key={id} className='page-break-avoid'>
                <div className='xl:max-w-3xl'>
                  <h3 className='font-body uppercase text-lg text-primary inline'>{title}</h3> — {desc}
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
                        <a className='inline-block after:content-["|"] after:px-1 last:after:content-[""]'>
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
        <Section id='education'>
          <Heading title='Education'>
            Self-taught, highly motivated individual with a drive to learn new things.
          </Heading>
          <div className={cx(isPrint ? 'space-y-4' : 'space-y-8')}>
            <div>
              <h3 className='font-body uppercase text-lg text-primary'>
                <Link className='link' to='https://www.edx.org/course/introduction-computer-science-harvardx-cs50x' external='resume_edu'>
                  CS50 — HarvardX
                </Link>
              </h3>
              <div>Online education programme of Harvard University</div>
              <div>C | Python | SQL | Algorithms | Data Structures</div>
              <div>2016</div>
            </div>
            <div>
              <h3 className='font-body uppercase text-lg text-primary'>Misr University for Science and Technology</h3>
              <div>Bachelor's degree, Physical Therapy</div>
              <div>2010 – 2016</div>
            </div>
            <div>
              <h3 className='font-body uppercase text-lg text-primary'>Other relevant course work</h3>
              <div>Various online education programmes</div>
              <div>GraphQL Essentials (2020) | Advanced React (2018) | Advanced JavaScript (2018) | PHP Design Patterns (2015)</div>
              <div>2015 – Present</div>
            </div>
          </div>
        </Section>
        <Section id='projects'>
          <Heading title='Projects'>Links to some of my past work.</Heading>
          <div className={cx(isPrint ? 'space-y-4' : 'space-y-8')}>
            <div>
              <h3 className='font-body uppercase text-lg text-primary'>Open Source</h3>
              <div><ProjectsCategoryLink id='open-source' outbound={isPrint} /></div>
            </div>
            <div>
              <h3 className='font-body uppercase text-lg text-primary'>Portfolio</h3>
              <div><ProjectsCategoryLink id='portfolio' outbound={isPrint} /></div>
            </div>
            <div>
              <h3 className='font-body uppercase text-lg text-primary'>Legacy Projects</h3>
              <div>Here you will find some legacy PHP projects I have worked on in my early days.</div>
              <Link className='link' to='https://phpclasses.org/browse/author/560033.html'>
                phpclasses.org/browse/author/560033.html
              </Link>
            </div>
          </div>
        </Section>
        {isPrint && (
          <Section className='grid grid-cols-2' fill sep>
            <div>
              <h3 className='font-body uppercase text-lg text-primary'>Interests</h3>
              <ul className='list-style-diamond ml-2 mt-4 space-y-2'>
                <li>Open Source</li>
                <li>Technology Trends</li>
                <li>Gaming</li>
                <li>Movies</li>
                <li>Football</li>
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
                    <span>{stripUrlProto(href)}</span>
                  </Link>
                </li>
              )}
            </Contacts>
          </Section>
        )}
        <Section id='references' className='page-break'>
          <Heading title='References'>
            Some feedback from people I have worked with in the past.
          </Heading>
          <div className={cx(isPrint ? 'columns-2' : 'xl:columns-2', '-mb-8')}>
            <Testimonial.Map data={tests.nodes} className='mb-8' />
          </div>
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

    tests: allTestimonial(sort: { order: [ASC, DESC], fields: [priority, received] }, limit: 10) {
      nodes {
        ...TestimonialFragment
      }
    }
  }
`
