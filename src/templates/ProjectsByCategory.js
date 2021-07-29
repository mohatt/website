import React from 'react'
import { graphql } from 'gatsby'
import { Page, Section, Heading } from '../components'
import { ProjectCard } from './partials'

export default class ProjectsByCategory extends Page {
  view() {
    const {
      data: { projects, categoryObj },
      pageContext: { category },
    } = this.props
    this.title = `${categoryObj.title} Projects`
    this.snippet = {
      $comp: 'Projects',
      category,
    }

    if (projects.pageInfo.currentPage > 1) {
      this.title += ` (Page ${projects.pageInfo.currentPage})`
    }

    return (
      <Section>
        <Heading title={this.title} primary>
          {categoryObj.desc}
        </Heading>
        <ProjectCard.Grid data={projects} paginated='projects.category' params={{ category }} />
      </Section>
    )
  }
}

export const query = graphql`
  query ProjectsByCategory($category: String!, $limit: Int!, $offset: Int!) {
    projects: allProject(
      limit: $limit
      skip: $offset
      filter: { categories: { elemMatch: { id: { eq: $category } } }, draft: { ne: true } }
      sort: { fields: [priority, title] }
    ) {
      ...ProjectCardGridPaginatedFragment
    }

    categoryObj: projectCategory(id: { eq: $category }) {
      title
      desc
    }
  }
`
