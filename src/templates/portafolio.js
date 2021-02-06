import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Section, Pagination, Heading } from '../components'

const PortafolioTemplate = ({ data: { page, projects } }) => {
  let title = page.title
  if (projects.pageInfo.currentPage > 1) {
    title += ` (Page ${projects.pageInfo.currentPage})`
  }

  return (
    <Layout title={title}>
      <Section>
        <Heading
          level='1'
          size='lg 4xl xl'
          pretitle="require('./projects.md');"
          subtitle='Some projects I worked on.'
          children={title}
        />
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(projects.edges, null, 2)}</pre>
        <Pagination route='portafolio' pageInfo={projects.pageInfo} ui='simple' />
      </Section>
    </Layout>
  )
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

export default PortafolioTemplate
