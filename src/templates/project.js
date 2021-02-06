import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Hero } from '../components'
import { MDXRenderer } from '../components/mdx'

const ProjectTemplate = ({ data: { page, project } }) => {
  return (
    <Layout title={project.frontmatter.title}>
      <Hero title={project.frontmatter.title}>
        <MDXRenderer>{project.body}</MDXRenderer>
      </Hero>
    </Layout>
  )
}

export const query = graphql`
  query Project($id: String!, $project: String!) {
    page(id: { eq: $id }) {
      title
    }
    project: mdx(frontmatter: { type: { eq: "project" }, slug: { eq: $project } }) {
      frontmatter {
        title
        date
      }
      body
    }
  }
`

export default ProjectTemplate
