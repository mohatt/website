import React from 'react'
import { graphql } from 'gatsby'
import Page from '../components/Page'
import Hero from '../components/Hero'

export default function Error({ data: { page } }) {
  return (
    <Page title={page.title}>
      <Hero title={page.title}>
        {page.data.message}
      </Hero>
    </Page>
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
