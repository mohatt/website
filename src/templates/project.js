import React from 'react'
import { graphql } from 'gatsby'
import Page from '../components/Page'
import Hero from '../components/Hero'
import MDXRenderer from '../components/MDXRenderer'

export default function Project({ data: { page, project } }) {
  return (
    <Page title={project.frontmatter.title}>
      <Hero title={project.frontmatter.title}>
        <MDXRenderer>{project.body}</MDXRenderer>
      </Hero>
    </Page>
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
