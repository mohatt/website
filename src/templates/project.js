import React from 'react'
import { graphql } from 'gatsby'
import { Page, Hero, Markdown } from '../components'

export default class Project extends Page {
  view() {
    const {
      data: { page, project },
      pageContext: { project: slug },
    } = this.props
    this.title = project.title
    this.snippet = {
      $comp: page.title,
      slug,
    }
    return (
      <Hero title={this.title}>
        <Markdown>{project.body}</Markdown>
      </Hero>
    )
  }
}

export const query = graphql`
  query Project($id: String!, $project: String!) {
    page(id: { eq: $id }) {
      title
    }
    project(slug: { eq: $project }) {
      title
      date
      body
    }
  }
`
