import { graphql, PageProps } from 'gatsby'
import { skillTagGroups } from '../constants'
import { PageHead, PageLayout } from '../layouts/page'
import { Heading, Icon, Link, Section } from '../components'
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

export default function Skills({ data }: PageProps<Queries.SkillsQuery>) {
  const {
    page: { title },
    skills: { nodes },
  } = data
  return (
    <PageLayout title={title}>
      <PageHead title={title} />
      <Section>
        <Heading title={title} primary>
          Shipping software takes more than code—here’s how I keep projects moving with fewer
          surprises and predictable delivery.
        </Heading>
        <div className='grid md:grid-cols-2 gap-8'>
          <SoftSkill title='Problem Solving' icon='bug'>
            Turn ambiguous requirements into clear, actionable steps and pragmatic solutions.
          </SoftSkill>
          <SoftSkill title='Systems thinking' icon='stack'>
            See the whole system (data flow, dependencies, failure modes) and design accordingly.
          </SoftSkill>
          <SoftSkill title='Communication' icon='chat'>
            Explain trade-offs clearly, write concise docs, give and receive constructive code
            reviews, and surface risks early.
          </SoftSkill>
          <SoftSkill title='Planning & ownership' icon='calendar'>
            Self-manage, set priorities, and deliver on time with well-structured outcomes.
          </SoftSkill>
        </div>
      </Section>
      {skillTagGroups.map(({ id, title, desc, tag, tags }) => (
        <Section key={id} id={id}>
          <Heading title={title}>{desc}</Heading>
          <div className='grid xs:grid-cols-2 xs:gap-x-1 md:grid-cols-3 md:gap-x-4 gap-y-8 xl:max-w-4xl text-lg font-medium leading-6'>
            {tags.map(({ id, title }) => (
              <ProjectSkill.Map key={id} data={nodes} tags={[tag, id]} limit={6}>
                {(items) => (
                  <div>
                    <h3 className='text-primary'>[{title}]</h3>
                    <ul className='mt-3 ml-3 space-y-3'>{items}</ul>
                  </div>
                )}
                {({ title, size, props, Icon }, _i) => (
                  <li>
                    {size > 0 ? (
                      <Link className='link' {...props}>
                        <Icon className='h-6 mr-2' />
                        <span>
                          {title} <sup>{size}</sup>
                        </span>
                      </Link>
                    ) : (
                      <>
                        <Icon className='h-6 mr-2' />
                        <span>{title}</span>
                      </>
                    )}
                  </li>
                )}
              </ProjectSkill.Map>
            ))}
          </div>
        </Section>
      ))}
    </PageLayout>
  )
}

export const query = graphql`
  query Skills($id: String!) {
    page(id: { eq: $id }) {
      title
    }

    skills: allProjectSkill {
      nodes {
        ...ProjectSkill
        icon
        tags
      }
    }
  }
`
