import React from 'react'
import { graphql } from 'gatsby'
import { Pagination } from '../../components'
import ProjectCard from './ProjectCard'

function ProjectsList ({ route, params, projects }) {
  const excludeCategories = params.category ? [params.category] : undefined
  const excludeSkills = params.skill ? [params.skill] : undefined

  return (
    <>
      <ProjectCard.Grid>
        {projects.edges.map(({ node }) => (
          <ProjectCard key={node.slug} project={node} excludeCategories={excludeCategories} excludeSkills={excludeSkills} />
        ))}
      </ProjectCard.Grid>
      <Pagination route={route} params={params} pageInfo={projects.pageInfo} />
    </>
  )
}

export const ProjectsListFragment = graphql`
  fragment ProjectsListFragment on ProjectConnection {
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

export default ProjectsList
