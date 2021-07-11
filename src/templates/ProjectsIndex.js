import React from 'react'
import { graphql } from 'gatsby'
import { Page, Button, ButtonGroup, Heading, Section } from '../components'
import { ProjectCardGrid, ProjectCategory } from './partials'

export default class ProjectsIndex extends Page {
  view() {
    const { data } = this.props
    this.title = data.page.title
    this.snippet = {
      $comp: 'Projects',
    }
    const groups = data.projects.group.sort(x => x.id === 'open-source' ? -1 : 0)
    return (
      <>
        <Section spacing={false}>
          <Heading title={this.title} primary>
            Since beginning my journey as a freelance developer, I’ve done remote
            work for agencies, consulted for startups, and collaborated with talented people to
            create web products for both business and consumer use.
          </Heading>
        </Section>
        {groups.map(({ id, totalCount, nodes }) => {
          if(nodes.length === 0) {
            return null
          }
          const category = nodes[0].categories.find(c => c.id === id)
          return (
            <Section key={id} id={id}>
              <Heading title={category.title}>
                {category.desc}
              </Heading>
              <ProjectCardGrid data={nodes} params={{ category: id }} />
              {totalCount > nodes.length && (
                <ButtonGroup className='mt-12'>
                  <Button disabled outline size='' color='primary'>
                    {nodes.length} out of {totalCount}
                  </Button>
                  <ProjectCategory category={category}>
                    {({ props }) => <Button size='' color='primary' {...props}>View all</Button>}
                  </ProjectCategory>
                </ButtonGroup>
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

    projects: allProject(sort: { fields: [priority, title] }, filter: { draft: { ne: true } }) {
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
