import React from 'react'
import { graphql } from 'gatsby'
import { Page, Heading, Section, Link } from '../components'
import { ProjectCard, ProjectCategory } from './partials'

export default class ProjectsIndex extends Page {
  view() {
    const { page: { title }, projects } = this.props.data
    this.title = title
    this.snippet = {
      $comp: 'Projects',
    }
    const groups = projects.group.sort(x => x.id === 'open-source' ? -1 : 0)
    return (
      <>
        <Section spacing={false}>
          <Heading title={title} primary>
            Since beginning my journey, I’ve done remote work for agencies, consulted for startups, and collaborated with talented people
            to create web products for both business and consumer use.
          </Heading>
        </Section>
        {groups.map(({ id, totalCount, nodes }) => {
          if (nodes.length === 0) return null
          const category = nodes[0].categories.find(c => c.id === id)
          return (
            <Section key={id} id={id}>
              <Heading title={category.title}>{category.desc}</Heading>
              <ProjectCard.Grid data={nodes} params={{ category: id }} />
              {totalCount > nodes.length && (
                <div className='mt-12 text-lg'>
                  <span>[{nodes.length} out of {totalCount}] </span>
                  <ProjectCategory category={category}>
                    {({ props }) => <Link className='link-primary' {...props}>View all »</Link>}
                  </ProjectCategory>
                </div>
              )}
            </Section>
          )
        })}
      </>
    )
  }
}

export const query = graphql`
  query ProjectsIndex($id: String!, $limit: Int!) {
    page(id: { eq: $id }) {
      title
    }

    projects: allProject(sort: { fields: [priority, started], order: [ASC, DESC] }, filter: { draft: { ne: true } }) {
      group(field: categories___id, limit: $limit) {
        id: fieldValue
        nodes {
          ...ProjectCardFragment
          categories {
            desc
          }
        }
        totalCount
      }
    }
  }
`
