import React from 'react'
import { Pagination as PaginationPlugin } from 'gatsby-plugin-advanced-pages'

function Pagination(props) {
  return (
    <>
      <PaginationPlugin {...props} />
    </>
  )
}

export default React.memo(Pagination)
