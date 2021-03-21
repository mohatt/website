import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'

export default function Error({ data: { page } }) {
  return (
    <Layout title={page.title}>
      <Hero title={page.title} pretitle="require('./error.md');">
        {page.data.message}
      </Hero>
    </Layout>
  )
}

export const query = graphql`
  query Error($id: String!) {
    page(id: { eq: $id }) {
      title
      data
    }
  }
`
