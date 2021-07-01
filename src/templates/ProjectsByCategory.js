import React from 'react'
import { graphql } from 'gatsby'
import { Page, Section, Heading } from '../components'
import { ProjectsList } from './partials'

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
        <ProjectsList route='projects.category' params={{ category }} projects={projects} />
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
      ...ProjectsListFragment
    }

    categoryObj: projectCategoryYaml(id: { eq: $category }) {
      title
      desc
    }
  }
`
