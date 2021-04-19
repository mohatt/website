import React from 'react'
import { graphql } from 'gatsby'
import { Page, Section, Heading, Pagination } from '../components'

export default class Portafolio extends Page {
  view() {
    const {
      data: {
        page: {
          title
        },
        projects
      },
      pageContext: {
        skill,
        category
      }
    } = this.props
    this.title = title
    this.pretext = {
      args: { skill, category }
    }
    if (projects.pageInfo.currentPage > 1) {
      this.title += ` (Page ${projects.pageInfo.currentPage})`
    }

    return (
      <>
        <Section>
          <Heading title={this.title} primary>
            Some projects I worked on.
          </Heading>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(projects.edges, null, 2)}</pre>
          <Pagination route='portafolio' pageInfo={projects.pageInfo} ui='simple' />
        </Section>
      </>
    )
  }
}

export const query = graphql`
  query Portafolio($id: String!, $limit: Int!, $offset: Int!, $filter: MdxFilterInput!) {
    page(id: { eq: $id }) {
      title
    }
    projects: allMdx(
      limit: $limit
      skip: $offset
      filter: $filter
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          frontmatter {
            slug
            title
            date
            description
            projectCategories {
              id
              title
            }
            projectSkills {
              id
              title
            }
          }
        }
      }
      pageInfo {
        ...Pagination
      }
    }
  }
`
