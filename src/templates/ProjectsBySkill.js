import React from 'react'
import { graphql } from 'gatsby'
import { Page, Section, Heading } from '../components'
import { ProjectsList } from './partials'

export default class ProjectsBySkill extends Page {
  view() {
    const {
      data: { projects, skillObj },
      pageContext: { skill },
    } = this.props
    this.title = `${skillObj.title} Projects`
    this.snippet = {
      $comp: 'Projects',
      skill,
    }

    if (projects.pageInfo.currentPage > 1) {
      this.title += ` (Page ${projects.pageInfo.currentPage})`
    }

    return (
      <Section>
        <Heading title={this.title} primary>
          All projects tagged with "{skill}" skill.
        </Heading>
        <ProjectsList route='projects.skill' params={{ skill }} projects={projects} />
      </Section>
    )
  }
}

export const query = graphql`
  query ProjectsBySkill($skill: String!, $limit: Int!, $offset: Int!) {
    projects: allProject(
      limit: $limit
      skip: $offset
      filter: { skills: { elemMatch: { id: { eq: $skill } } }, draft: { ne: true } }
      sort: { fields: [priority, title] }
    ) {
      ...ProjectsListFragment
    }

    skillObj: projectSkillYaml(id: { eq: $skill }) {
      title
    }
  }
`
