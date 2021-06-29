import React from 'react'
import { Pagination as PaginationPlugin } from 'gatsby-plugin-advanced-pages'

export default function Pagination(props) {
  if (!props.pageInfo.pageCount) {
    return null
  }

  return (
    <PaginationPlugin
      className='mt-12'
      ui='mini'
      theme={{
        item: 'btn btn-alt rounded-full',
        'item.next': 'float-right',
      }}
      renderDisabled={false}
      {...props}
    />
  )
}
