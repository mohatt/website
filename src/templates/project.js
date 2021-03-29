import React from 'react'
import { graphql } from 'gatsby'
import { Page, Hero, Markdown } from '../components'

export default function Project({ data: { page, project }, pageContext: { project: slug } }) {
  return (
    <Page title={project.frontmatter.title} pre={{ func: page.title, args: { slug }}}>
      <Hero title={project.frontmatter.title}>
        <Markdown>{project.body}</Markdown>
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
