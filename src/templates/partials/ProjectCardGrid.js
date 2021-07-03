import React from 'react'
import { graphql } from 'gatsby'
import { Pagination } from '../../components'
import { ProjectCard } from '.'

export default function ProjectCardGrid({ data, paginated, params }) {
  const filterCategories = params.category ? [params.category] : undefined
  const filterSkills = params.skill ? [params.skill] : undefined

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8 text-lg'>
      <ProjectCard.Map
        data={data}
        filterCategories={filterCategories}
        filterSkills={filterSkills}
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
