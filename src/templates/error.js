import React from 'react'
import { graphql } from 'gatsby'
import { Page, Hero } from '../components'

export default function Error({ data: { page: { title, data: { code = 404, message } } } }) {
  return (
    <Page title={title} pre={{ func: 'Error', args: { code } }}>
      <Hero title={title}>
        {message}
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
