import React from 'react'
import { graphql } from 'gatsby'
import { skillTagGroups } from '../constants'
import { Page, Heading, Icon, Link, Section } from '../components'
import { ProjectSkill } from './partials'

function SoftSkill({ icon, title, children }) {
  return (
    <div className='text-lg'>
      <h3 className='text-primary'>
        <Icon name={icon} className='w-8 h-8 mr-2' />
        <span>{title}</span>
      </h3>
      <div className='mt-3 ml-3'>{children}</div>
    </div>
  )
}

export default class Skills extends Page {
  view() {
    const { page: { title }, skills: { nodes } } = this.props.data
    this.title = title
    return (
      <>
        <Section>
          <Heading title={title} primary>
            Software development is hard. Managing projects is hard. Working remotely is hard. Here are some
            things I'm good at, to help ease the pain.
          </Heading>
          <div className='grid md:grid-cols-2 gap-8'>
            <SoftSkill title='Problem Solving' icon='bug'>
              I can take vague problems and requirements and break them down into steps and solutions.
            </SoftSkill>
            <SoftSkill title='Systematic Thinking' icon='stack'>
              I'm good at thinking abstractly and putting together systems with many moving parts.
            </SoftSkill>
            <SoftSkill title='Communicating' icon='chat'>
              I can explain things clearly, communicate problems quickly and write accurately and concisely.
            </SoftSkill>
            <SoftSkill title='Organising' icon='calendar'>
              I can self-manage, work to deadlines, organise projects and present well-structured
              and complete deliverables.
            </SoftSkill>
          </div>
        </Section>
        {skillTagGroups.map(({ id, title, desc, tag, tags }) => (
          <Section key={id} id={id}>
            <Heading title={title}>{desc}</Heading>
            <div className='grid xs:grid-cols-2 xs:gap-x-1 md:grid-cols-3 md:gap-x-4 gap-y-8 xl:max-w-4xl text-lg font-medium leading-6'>
              {tags.map(({ id, title }) => (
                <ProjectSkill.Map key={id} data={nodes} tags={[tag, id]} limit={6}>
                  {items => (
                    <div>
                      <h3 className='text-primary'>[{title}]</h3>
                      <ul className='mt-3 ml-3 space-y-3'>{items}</ul>
                    </div>
                  )}
                  {({ title, size, props, Icon }) => (
                    <li>
                      {size > 0
                        ? <Link className='link' {...props}><Icon className='h-6 mr-2' /><span>{title} <sup>{size}</sup></span></Link>
                        : <><Icon className='h-6 mr-2' /><span>{title}</span></>
                      }
                    </li>
                  )}
                </ProjectSkill.Map>
              ))}
            </div>
          </Section>
        ))}
      </>
    )
  }
}

export const query = graphql`
  query Skills($id: String!) {
    page(id: { eq: $id }) {
      title
    }

    skills: allProjectSkill {
      nodes {
        ...ProjectSkillFragment
        icon
        tags
      }
    }
  }
`
