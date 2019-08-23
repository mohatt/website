import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Hero, Mdx } from '../components'

const ProjectTemplate = ({ data: { page, project } }) => {
  return (
    <Layout title={project.frontmatter.title}>
      <Hero title={project.frontmatter.title}>
        <Mdx>{project.body}</Mdx>
      </Hero>
    </Layout>
  )
}

export const query = graphql`
  query Project($id: String!, $project: String!) {
    page(id: { eq: $id }) {
      title
      body
    }
    project: mdx(frontmatter: {
      type: { eq: "project" },
      slug: { eq: $project }
    }) {
      frontmatter {
        title
        date
      }
      body
    }
  }
`

export default ProjectTemplate
