import React from 'react'
import { graphql } from 'gatsby'
import { Page, Hero } from '../components'

export default class Error extends Page {
  view() {
    const {
      page: {
        title,
        data: { code = 404, message },
      },
    } = this.props.data
    this.title = title
    this.noIndex = true
    this.snippet = {
      $comp: 'Error',
      code,
    }
    return <Hero title={title}>{message}</Hero>
  }
}

export const query = graphql`
  query Error($id: String!) {
    page(id: { eq: $id }) {
      title
      data
    }
  }
`
