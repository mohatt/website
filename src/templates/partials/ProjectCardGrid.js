import React from 'react'
import { graphql } from 'gatsby'
import { Pagination } from '../../components'
import { ProjectCard } from '.'

export default function ProjectCardGrid({ data, paginated, params }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8 text-lg'>
      <ProjectCard.Map
        data={data}
        category={params.category}
        skill={params.skill}
      />
      {paginated && (
        <Pagination route={paginated} params={params} pageInfo={data.pageInfo} />
      )}
    </div>
  )
}

export const ProjectCardGridPaginatedFragment = graphql`
  fragment ProjectCardGridPaginatedFragment on ProjectConnection {
    edges {
      node {
        ...ProjectCardFragment
      }
    }
    pageInfo {
      ...Pagination
    }
  }
`
