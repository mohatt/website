import { graphql, PageProps } from 'gatsby'
import { Heading, Section, Link } from '@/components'
import { PageHead, PageLayout } from '@/layouts/page'
import { ProjectCard, ProjectCategory } from './partials'

export default function ProjectsIndex(props: PageProps<Queries.ProjectsIndexQuery>) {
  const {
    page: { title },
    projects,
  } = props.data
  const groups = [...projects.group].sort((x) => (x.slug === 'portfolio' ? -1 : 0))
  return (
    <PageLayout title={title}>
      <PageHead title={title} />
      <Section spacing={false}>
        <Heading title={title} primary>
          A selection of production and open-source projects I’ve built.
        </Heading>
      </Section>
      {groups.map(({ slug, totalCount, nodes }) => {
        if (nodes.length === 0) return null
        const category = nodes[0].categories.find((c) => c.slug === slug)
        return (
          <Section key={slug} id={slug}>
            <Heading title={category.title}>{category.desc}</Heading>
            <ProjectCard.Grid data={nodes} paginationParams={{ category: slug }} />
            {totalCount > nodes.length && (
              <div className='mt-10 text-xl'>
                <span>
                  {nodes.length} of {totalCount} projects —{' '}
                </span>
                <ProjectCategory item={category} index={0}>
                  {({ props }) => (
                    <Link className='link-primary' {...props}>
                      View all »
                    </Link>
                  )}
                </ProjectCategory>
              </div>
            )}
          </Section>
        )
      })}
    </PageLayout>
  )
}

export const query = graphql`
  query ProjectsIndex($id: String!, $limit: Int!) {
    page(id: { eq: $id }) {
      title
    }

    projects: allProject(
      sort: [{ priority: ASC }, { started: DESC }]
      filter: { draft: { ne: true } }
    ) {
      group(field: { categories: { slug: SELECT } }, limit: $limit) {
        slug: fieldValue
        nodes {
          ...ProjectCard
          categories {
            desc
          }
        }
        totalCount
      }
    }
  }
`
