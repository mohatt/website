import {
  Pagination as BasePagination,
  PaginationProps as BasePaginationProps,
} from 'gatsby-plugin-advanced-pages'

export interface PaginationProps extends BasePaginationProps {}

export default function Pagination(props: PaginationProps) {
  if (!props.pageInfo.pageCount) {
    return null
  }

  return (
    <BasePagination
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
