import { graphql, PageProps } from 'gatsby'
import { PageHead, PageLayout } from '@/layouts/page'
import { Section, Heading } from '@/components'
import { ProjectCard } from './partials'

export default function ProjectsByCategory(
  props: PageProps<Queries.ProjectsByCategoryQuery, { category: string }>,
) {
  const {
    data: { projects, categoryObj },
    pageContext: { category },
  } = props
  let title = `${categoryObj.title} Projects`
  if (projects.pageInfo.currentPage > 1) {
    title += ` (Page ${projects.pageInfo.currentPage})`
  }

  return (
    <PageLayout title={title} snippet={{ $comp: 'Projects', category }}>
      <PageHead title={title} />
      <Section>
        <Heading title={title} primary>
          {categoryObj.desc}
        </Heading>
        <ProjectCard.Grid
          data={projects}
          paginationRote='projects.category'
          paginationParams={{ category }}
        />
      </Section>
    </PageLayout>
  )
}

export const query = graphql`
  query ProjectsByCategory($category: String!, $limit: Int!, $offset: Int!) {
    projects: allProject(
      limit: $limit
      skip: $offset
      filter: { categories: { elemMatch: { slug: { eq: $category } } }, draft: { ne: true } }
      sort: [{ priority: ASC }, { started: DESC }]
    ) {
      ...ProjectCardGridPaginated
    }

    categoryObj: projectCategory(slug: { eq: $category }) {
      title
      desc
    }
  }
`
