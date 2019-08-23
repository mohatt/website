import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Hero, Mdx } from '../components'

const ErrorTemplate = ({ data: { page } }) => {
  return (
    <Layout title={page.title}>
      <Hero title={page.title} pretitle="require('./error.md');">
        <Mdx>{page.body}</Mdx>
      </Hero>
    </Layout>
  )
}

export const query = graphql`
  query Error($id: String!) {
    page(id: { eq: $id }) {
      title
      body
    }
  }
`

export default ErrorTemplate
