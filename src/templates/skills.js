import React from 'react'
import { graphql } from 'gatsby'
import { useProjectSkills } from '../hooks/project-skills'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Heading from '../components/Heading'
import Icon from '../components/Icon'
import Link from '../components/Link'

const categories = {
  backend: [
    { title: 'Languages', icon: 'code', category: 'language' },
    { title: 'Frameworks', icon: 'stack', category: 'framework' },
    { title: 'CMS', icon: 'tree', category: 'cms' },
    { title: 'Databases', icon: 'database', category: 'database' },
    { title: 'APIs', icon: 'cloud', category: 'api' },
    { title: 'Testing', icon: 'checks', category: 'test' },
  ],
  frontend: [
    { title: 'Languages', icon: 'code', category: 'language' },
    { title: 'JavaScript', icon: 'javascript', category: 'js' },
    { title: 'CSS', icon: 'css', category: 'css' },
  ],
  cloud: [
    { title: 'Git Hosting', icon: 'gitRepo', category: 'git' },
    { title: 'Deployment', icon: 'cloudUp', category: 'deploy' },
    { title: 'CI/CD', icon: 'tools', category: 'ci' },
  ],
  software: [
    { title: 'Environment', icon: 'computer', category: 'env' },
    { title: 'Applications', icon: 'appStore', category: 'app' },
    { title: 'Package Managers', icon: 'cloudDown', category: 'pkgman' },
    { title: 'Communication', icon: 'discuss', category: 'comms' },
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

const SkillCategory = ({ id }) => (
  <div className='grid grid-cols-3 gap-8 max-w-4xl text-lg'>
    {categories[id].map(({ title, icon, category }) => {
      const skills = useProjectSkills([id, category])
      return skills.length > 0 && (
        <div key={title} className='flex'>
          <Icon name={icon} className='h-8 w-8 text-primary' />
          <div className='flex-1 pl-2'>
            <h3 className='text-primary'>{title}</h3>
            <ul className='mt-4 space-y-2'>
              {skills.map(({ id, title, icon, projects }) => (
                <li key={id}>
                  <Icon path={icon} className='h-6 w-6 mr-2 text-primary' />
                  {title}
                  {projects > 0 && (
                    <Link
                      to='portafolio.skill'
                      params={{ skill: id }}
                      className='btn btn-alt rounded-full text-xs ml-2 py-0 px-2'
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

export default function Skills({ data: { page } }) {
  return (
    <Layout title={page.title}>
      <Section>
        <Heading title={page.title} primary>
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
            I can self-manage, work to deadlines, organise projects and present well-structured and
            complete deliverables.
          </SkillBlock>
        </div>
      </Section>
      <Section>
        <Heading title='Back-end Development'>
          This is my main area of expertise. Nearly every app I have
          launched in the past had the back-end done by me. My main stack usually
          involves PHP with the CMS/Framework of choice, and alternatively Node.js.
        </Heading>
        <SkillCategory id='backend' />
      </Section>
      <Section>
        <Heading title='Front-end Development'>
          I create responsive websites that allow the user to have the
          best and most appropriate experience suited to the device they are using.
        </Heading>
        <SkillCategory id='frontend' />
      </Section>
      <Section>
        <Heading title='Cloud Services'>
          I use these cloud services to setup an integrated, effective and
          efficient web development workflow that meets the project needs.
        </Heading>
        <SkillCategory id='cloud' />
      </Section>
      <Section>
        <Heading title='Software'>My local web development setup.</Heading>
        <SkillCategory id='software' />
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query Skills($id: String!) {
    page(id: { eq: $id }) {
      title
      data
    }
  }
`
