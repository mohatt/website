import React from 'react'
import { graphql, Link } from 'gatsby'
import { Layout, Section, Heading, Icon, ProgressRing } from '../components'

const SkillBlock = ({ icon, title, children }) => {
  return (
    <>
      <div className='w-1/2 flex px-2 mt-8'>
        <Icon name={icon} className='h-8 w-8 text-primary' />
        <div className='flex-1 pl-2'>
          <h3 className='font-medium font-mono italic text-primary rfs-xlg'>{title}</h3>
          <div className='mt-4'>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

const Skill = ({ id, title, experience }) => {
  return (
    <>
      <Link to={`/portafolio/tag/${id}`}>
        <ProgressRing value={experience} stroke={20} className='icon w-4' /> {title}
      </Link>
    </>
  )
}

const SkillsTemplate = ({ data: { page } }) => {
  return (
    <Layout title={page.title}>
      <Section>
        <Heading
          size='lg 4xl xl'
          pretitle="require('./skills.md');"
          subtitle="Software development is hard. Managing projects is hard. Working remotely is hard. Here are some things I'm good at, to help ease the pain."
        >
          Skills
        </Heading>
        <div className='flex flex-wrap -mx-2'>
          <SkillBlock icon='mdBugReport' title='Problem Solving'>
            I'm can take vague problems and requirements and break them down into steps and solutions.
          </SkillBlock>
          <SkillBlock icon='mdDeveloperBoard' title='Systems Thinking'>
            I'm good at thinking abstractly and putting together systems with many moving parts.
          </SkillBlock>
          <SkillBlock icon='mdQuestionAnswer' title='Communicating'>
            I can explain things clearly, communicate problems quickly and write accurately and concisely.
          </SkillBlock>
          <SkillBlock icon='mdEventNote' title='Organising'>
            I can self-manage, work to deadlines, organise projects and present well-structured and complete deliverables.
          </SkillBlock>
        </div>
      </Section>
      <Section>
        <Heading
          level='2'
          size='lg 3xl xl'
          width='45rem'
          spacing='4'
          subtitle='This is my main area of expertise. Nearly every app I have launched in the past had the back-end done by me. My main stack involves PHP with the CMS/Framework of choice, and alternatively Node.js or Python.'
        >
          Back-end Development
        </Heading>
        <div className='flex flex-wrap -mx-2'>

          <SkillBlock icon='mdBugReport' title='Languages'>
            <ul>
              <li><Skill id='php' title='PHP' experience={100} /></li>
              <li><Skill id='node' title='Node.js' experience={70} /></li>
            </ul>
          </SkillBlock>
          <SkillBlock icon='mdDeveloperBoard' title='Frameworks'>
            <ul>
              <li>Symfony</li>
              <li>Laravel</li>
            </ul>
          </SkillBlock>
        </div>
      </Section>
      <Section>
        <Heading
          level='2'
          size='lg 3xl xl'
          width='45rem'
          spacing='4'
          subtitle='I create responsive websites that allow the user to have the best and most appropriate experience suited to the device they are using. My current experience and skills in front-end includes:'
        >
          Front-end Development
        </Heading>
      </Section>
      <Section>
        <Heading
          level='2'
          size='lg 3xl xl'
          width='45rem'
          spacing='4'
          subtitle='I use these tools as part of my development process.'
        >
          Tools
        </Heading>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query Skills($id: String!) {
    page(id: { eq: $id }) {
      title
    }
  }
`

export default SkillsTemplate
