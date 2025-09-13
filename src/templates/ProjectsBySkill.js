import { graphql } from 'gatsby'
import { Page, Section, Heading } from '../components'
import { ProjectCard } from './partials'

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
          All projects tagged with “{skill}” skill.
        </Heading>
        <ProjectCard.Grid
          data={projects}
          paginationRote='projects.skill'
          paginationParams={{ skill }}
        />
      </Section>
    )
  }
}

export const query = graphql`
  query ProjectsBySkill($skill: String!, $limit: Int!, $offset: Int!) {
    projects: allProject(
      limit: $limit
      skip: $offset
      filter: { skills: { elemMatch: { slug: { eq: $skill } } }, draft: { ne: true } }
      sort: [{ categories: { slug: DESC } }, { priority: ASC }, { started: DESC }]
    ) {
      ...ProjectCardGridPaginated
    }

    skillObj: projectSkill(slug: { eq: $skill }) {
      title
    }
  }
`
