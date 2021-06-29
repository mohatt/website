import React from 'react'
import { graphql } from 'gatsby'
import { useProjectCategory } from '../hooks'
import { Page, Section, Heading, Button, ButtonGroup } from '../components'
import { ProjectCard } from './partials'

function CategoryProjects({ id, projects, totalCount }) {
  const category = useProjectCategory(id)
  return (
    <Section>
      <Heading title={category.title}>
        {category.desc}
      </Heading>
      <ProjectCard.Grid>
        {projects.map(project => (
          <ProjectCard key={project.slug} project={project} excludeCategories={[id]} />
        ))}
      </ProjectCard.Grid>
      {totalCount > projects.length && (
        <ButtonGroup className='mt-12'>
          <Button disabled outline color='primary'>
            {projects.length} out of {totalCount}
          </Button>
          <Button color='primary' {...category.props}>
            View all
          </Button>
        </ButtonGroup>

      )}
    </Section>
  )
}

export default class ProjectsIndex extends Page {
  view() {
    const {
      data: {
        page: { title },
        projects,
      },
    } = this.props
    this.title = title
    this.snippet = {
      $comp: 'Projects',
    }

    return (
      <>
        <Section spacing={false}>
          <Heading title={this.title} primary>
            Since beginning my journey as a freelance developer nearly 7 years ago, I’ve done remote work for agencies,
            consulted for startups, and collaborated with talented people to create web products for both business and consumer use.
          </Heading>
        </Section>
        {projects.group
          .sort(x => x.id === 'open-source' ? -1 : 0)
          .map(props => <CategoryProjects key={props.id} {...props} />)}
      </>
    )
  }
}

export const query = graphql`
  query ProjectsIndex($id: String!, $limit: Int!) {
    page(id: { eq: $id }) {
      title
    }

    projects: allProject(sort: { order: ASC, fields: [title] }, filter: { draft: { ne: true } }) {
      group(field: categories___id, limit: $limit) {
        id: fieldValue
        projects: nodes {
          ...ProjectCardFragment
        }
        totalCount
      }
    }
  }
`
