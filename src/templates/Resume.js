import React from 'react'
import { graphql } from 'gatsby'
import { skillTags } from '../constants'
import { Page, Heading, Section, Button, Link } from '../components'
import { ProjectSkill, Testimonial } from './partials'

export default class Resume extends Page {
  view() {
    const { page: { title }, skills, tests } = this.props.data
    this.title = title
    return (
      <>
        <Section>
          <Heading title={title} primary>
            TO DO
          </Heading>
        </Section>
        <Section id='experience'>
          <Heading title='Experience'>
            From 2008 to present.
          </Heading>
          <div className='grid md:grid-cols-2 gap-8'>
            TO DO
          </div>
        </Section>
        <Section id='skills'>
          <Heading title='Skills'>
            Technologies I use in everyday work.
          </Heading>
          <div className='grid md:grid-cols-3 gap-x-4 gap-y-8'>
            {['lang', 'frame', 'db', 'api', 'cms', 'ui'].map(tag => (
              <ProjectSkill.Map key={tag} data={skills.nodes} tags={[tag]}>
                {items => (
                  <div>
                    <h3 className='text-lg text-primary'>{skillTags[tag]}</h3>
                    <div className='mt-1'>{items}</div>
                  </div>
                )}
                {({ props, size }) => (
                  <Button color='alt' size='mono' disabled={!size} rounded={false} className='mr-2 mt-2 rounded-md' outline {...props} />
                )}
              </ProjectSkill.Map>
            ))}
          </div>
          <div className='mt-12'>
            <Link to='skills' className='link-primary text-lg'>View my complete skillset »</Link>
          </div>
        </Section>
        <Section id='testimonials'>
          <Heading title='Testimonials'>
            Some feedback from people I have worked with in the past.
          </Heading>
          <div className='flex flex-col flex-wrap -mt-8 xl:max-h-[56rem] xl:-ml-4'>
            <Testimonial.Map data={tests.nodes} className='mt-8 xl:w-1/2 xl:pl-4' />
          </div>
        </Section>
      </>
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
