import React from 'react'
import { graphql } from 'gatsby'
import { Page, Hero } from '../components'

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
