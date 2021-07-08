import React from 'react'
import { graphql } from 'gatsby'
import { useProjectSkills } from '../hooks'
import { Page, Heading, Icon, Link, Section } from '../components'
import { ProjectSkill } from './partials'

const tags = {
  backend: [
    { id: 'language', title: 'Languages', icon: 'code' },
    { id: 'framework', title: 'Frameworks', icon: 'stack' },
    { id: 'cms', title: 'CMSs', icon: 'tree' },
    { id: 'database', title: 'Databases', icon: 'database' },
    { id: 'api', title: 'APIs', icon: 'cloud' },
    { id: 'test', title: 'Testing', icon: 'test' },
  ],
  frontend: [
    { id: 'language', title: 'Languages', icon: 'code' },
    { id: 'js', title: 'JavaScript', icon: 'javascript' },
    { id: 'css', title: 'CSS', icon: 'css' },
    { id: 'api', title: 'APIs', icon: 'cloud' },
    { id: 'ssg', title: 'SSGs', icon: 'stack' },
  ],
  devops: [
    { id: 'tool', title: 'Tools', icon: 'terminal' },
    { id: 'deploy', title: 'Deployment', icon: 'cloudUp' },
    { id: 'ci', title: 'CI/CD', icon: 'tools' },
    { id: 'pkgman', title: 'Package Managers', icon: 'cloudDown' },
    { id: 'git', title: 'Git Hosting', icon: 'gitRepo' },
  ],
  software: [
    { id: 'dev', title: 'Development', icon: 'appStore' },
    { id: 'comms', title: 'Communication', icon: 'discuss' },
    { id: 'env', title: 'Environment', icon: 'computer' },
  ],
}

function SkillBlock({ icon, title, children }) {
  return (
    <div className='flex text-lg leading-normal'>
      <Icon name={icon} className='h-8 text-primary' />
      <div className='flex-1'>
        <h3 className='ml-2 leading-8 text-primary'>{title}</h3>
        <div className='mt-4 -ml-3'>{children}</div>
      </div>
    </div>
  )
}

function SkillList({ tags, title, icon }) {
  const skills = useProjectSkills(tags)
  return skills.length > 0 && (
    <div className='flex'>
      <Icon name={icon} className='h-8 text-primary' />
      <div className='flex-1'>
        <h3 className='ml-2 leading-8 text-primary'>{title}</h3>
        <ul className='mt-3 -ml-4 space-y-3 font-medium'>
          <ProjectSkill.Map data={skills}>
            {({ title, projects, props, Icon }) => (
              <li className='flex leading-6'>
                {projects > 0
                  ? (
                    <Link className='text-primary hover:underline' {...props}>
                      <Icon className='h-6 mr-2' />{title} <sup>{projects}</sup>
                    </Link>
                  )
                  : <><Icon className='h-6 mr-2' />{title}</>
                }
              </li>
            )}
          </ProjectSkill.Map>
        </ul>
      </div>
    </div>
  )
}

function SkillTagGrid({ tag }) {
  return (
    <div className='grid xs:grid-cols-2 xs:gap-x-1 xl:grid-cols-3 xl:gap-x-4 gap-y-8 xl:max-w-4xl text-lg'>
      {tags[tag].map(({ id, title, icon }) => (
        <SkillList key={id} tags={[tag, id]} title={title} icon={icon} />
      ))}
    </div>
  )
}

export default class Skills extends Page {
  view() {
    this.title = this.props.data.page.title
    return (
      <>
        <Section>
          <Heading title={this.title} primary>
            Software development is hard. Managing projects is hard. Working remotely is hard. Here are some
            things I'm good at, to help ease the pain.
          </Heading>
          <div className='grid md:grid-cols-2 gap-8'>
            <SkillBlock icon='bug' title='Problem Solving'>
              I can take vague problems and requirements and break them down into steps and solutions.
            </SkillBlock>
            <SkillBlock icon='server' title='Systems Thinking'>
              I'm good at thinking abstractly and putting together systems with many moving parts.
            </SkillBlock>
            <SkillBlock icon='discuss' title='Communicating'>
              I can explain things clearly, communicate problems quickly and write accurately and concisely.
            </SkillBlock>
            <SkillBlock icon='calendar' title='Organising'>
              I can self-manage, work to deadlines, organise projects and present well-structured
              and complete deliverables.
            </SkillBlock>
          </div>
        </Section>
        <Section id='backend'>
          <Heading title='Back-end Development'>
            This is my main area of expertise. Nearly every app I have launched in the past had the
            back-end done by me. My main stack usually involves PHP with the CMS/Framework of
            choice, and alternatively Node.js.
          </Heading>
          <SkillTagGrid tag='backend' />
        </Section>
        <Section id='frontend'>
          <Heading title='Front-end Development'>
            I create responsive websites that allow the user to have the best and most appropriate
            experience suited to the device they are using.
          </Heading>
          <SkillTagGrid tag='frontend' />
        </Section>
        <Section id='devops'>
          <Heading title='DevOps'>
            I use these tools and cloud services to setup an integrated, effective and efficient
            workflows that meet the project needs.
          </Heading>
          <SkillTagGrid tag='devops' />
        </Section>
        <Section id='software'>
          <Heading title='Software'>
            My local web development setup.
          </Heading>
          <SkillTagGrid tag='software' />
        </Section>
      </>
    )
  }
}

export const query = graphql`
  query Skills($id: String!) {
    page(id: { eq: $id }) {
      title
    }
  }
`
