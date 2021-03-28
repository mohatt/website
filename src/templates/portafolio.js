import React from 'react'
import { graphql } from 'gatsby'
import { useProjectSkills } from '../hooks/project-skills'
import Page from '../components/Page'
import Section from '../components/Section'
import Heading from '../components/Heading'
import Pagination from '../components/Pagination'

export default function Portafolio({ data: { page, projects }, pageContext: { skill, category } }) {
  const skills = useProjectSkills()

  let title = page.title
  if (projects.pageInfo.currentPage > 1) {
    title += ` (Page ${projects.pageInfo.currentPage})`
  }

  return (
    <Page title={title}>
      <Section>
        <Heading title={title} primary>
          Some projects I worked on.
        </Heading>
        <p>Total skills: {skills.length}</p>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(projects.edges, null, 2)}</pre>
        <Pagination route='portafolio' pageInfo={projects.pageInfo} ui='simple' />
      </Section>
    </Page>
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
