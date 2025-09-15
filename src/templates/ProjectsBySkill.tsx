import { graphql, PageProps } from 'gatsby'
import { PageHead, PageLayout } from '@/layouts/page'
import { Section, Heading } from '@/components'
import { ProjectCard } from './partials'

export default function ProjectsBySkill(
  props: PageProps<Queries.ProjectsBySkillQuery, { skill: string }>,
) {
  const {
    data: { projects, skillObj },
    pageContext: { skill },
  } = props
  let title = `${skillObj.title} Projects`
  if (projects.pageInfo.currentPage > 1) {
    title += ` (Page ${projects.pageInfo.currentPage})`
  }

  return (
    <PageLayout title={title} snippet={{ $comp: 'Projects', skill }}>
      <PageHead title={title} />
      <Section>
        <Heading title={title} primary>
          All projects tagged with “{skill}” skill.
        </Heading>
        <ProjectCard.Grid
          data={projects}
          paginationRote='projects.skill'
          paginationParams={{ skill }}
        />
      </Section>
    </PageLayout>
  )
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
