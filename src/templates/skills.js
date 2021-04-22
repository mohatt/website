import React from 'react'
import { graphql } from 'gatsby'
import { useProjectSkills } from '../hooks'
import { Page, Section, Heading, BaseIcon, Icon, Button } from '../components'

const tags = {
  backend: [
    { id: 'language', title: 'Languages', icon: 'code' },
    { id: 'framework', title: 'Frameworks', icon: 'stack' },
    { id: 'cms', title: 'CMS', icon: 'tree' },
    { id: 'database', title: 'Databases', icon: 'database' },
    { id: 'api', title: 'APIs', icon: 'cloud' },
    { id: 'test', title: 'Testing', icon: 'checks' },
  ],
  frontend: [
    { id: 'language', title: 'Languages', icon: 'code' },
    { id: 'js', title: 'JavaScript', icon: 'javascript' },
    { id: 'css', title: 'CSS', icon: 'css' },
  ],
  cloud: [
    { id: 'git', title: 'Git Hosting', icon: 'gitRepo' },
    { id: 'deploy', title: 'Deployment', icon: 'cloudUp' },
    { id: 'ci', title: 'CI/CD', icon: 'tools' },
  ],
  software: [
    { id: 'env', title: 'Environment', icon: 'computer' },
    { id: 'app', title: 'Applications', icon: 'appStore' },
    { id: 'pkgman', title: 'Package Managers', icon: 'cloudDown' },
    { id: 'comms', title: 'Communication', icon: 'discuss' },
  ],
}

const SkillBlock = ({ icon, title, children }) => (
  <div className='flex text-lg leading-normal'>
    <Icon name={icon} className='h-8 w-8 text-primary' />
    <div className='flex-1 pl-2'>
      <h3 className='text-primary'>{title}</h3>
      <div className='mt-4'>{children}</div>
    </div>
  </div>
)

const SkillTag = ({ tag }) => (
  <div className='grid grid-cols-3 gap-8 max-w-4xl text-lg'>
    {tags[tag].map(({ id, title, icon }) => {
      const skills = useProjectSkills([tag, id])
      return skills.length > 0 && (
        <div key={title} className='flex'>
          <Icon name={icon} className='h-8 w-8 text-primary' />
          <div className='flex-1 pl-2'>
            <h3 className='text-primary'>{title}</h3>
            <ul className='mt-4 space-y-2'>
              {skills.map(({ id, title, icon, projects }) => (
                <li key={id}>
                  <BaseIcon path={icon} className='h-6 w-6 mr-2 text-primary' />
                  {title}
                  {projects > 0 && (
                    <Button
                      color='alt'
                      className='text-xs ml-2 py-0 px-2'
                      to='portafolio.skill'
                      params={{ skill: id }}
                      title={`View projects tagged with '${id}'`}
                      children={projects}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    })}
  </div>
)

export default class Skills extends Page {
  view() {
    this.title = this.props.data.page.title
    return (
      <>
        <Section>
          <Heading title={this.title} primary>
            Software development is hard. Managing projects is hard.
            Working remotely is hard. Here are some things I'm good at, to
            help ease the pain.
          </Heading>
          <div className='grid grid-cols-2 gap-8'>
            <SkillBlock icon='bug' title='Problem Solving'>
              I'm can take vague problems and requirements and break them down into steps and
              solutions.
            </SkillBlock>
            <SkillBlock icon='server' title='Systems Thinking'>
              I'm good at thinking abstractly and putting together systems with many moving parts.
            </SkillBlock>
            <SkillBlock icon='discuss' title='Communicating'>
              I can explain things clearly, communicate problems quickly and write accurately and
              concisely.
            </SkillBlock>
            <SkillBlock icon='calendar' title='Organising'>
              I can self-manage, work to deadlines, organise projects and present well-structured
              and complete deliverables.
            </SkillBlock>
          </div>
        </Section>
        <Section>
          <Heading title='Back-end Development'>
            This is my main area of expertise. Nearly every app I have
            launched in the past had the back-end done by me. My main stack usually
            involves PHP with the CMS/Framework of choice, and alternatively Node.js.
          </Heading>
          <SkillTag tag='backend' />
        </Section>
        <Section>
          <Heading title='Front-end Development'>
            I create responsive websites that allow the user to have the
            best and most appropriate experience suited to the device they are using.
          </Heading>
          <SkillTag tag='frontend' />
        </Section>
        <Section>
          <Heading title='Cloud Services'>
            I use these cloud services to setup an integrated, effective and
            efficient web development workflow that meets the project needs.
          </Heading>
          <SkillTag tag='cloud' />
        </Section>
        <Section>
          <Heading title='Software'>My local web development setup.</Heading>
          <SkillTag tag='software' />
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
