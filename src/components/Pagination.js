import React from 'react'
import { Pagination as PaginationPlugin } from 'gatsby-plugin-advanced-pages'

export default function Pagination(props) {
  return (
    <>
      <PaginationPlugin {...props} />
    </>
  )
}
