import { graphql } from 'gatsby'
import { Page, Heading, Section, Link } from '../components'
import { ProjectCard, ProjectCategory } from './partials'

export default class ProjectsIndex extends Page {
  view() {
    const {
      page: { title },
      projects,
    } = this.props.data
    this.title = title
    this.snippet = {
      $comp: 'Projects',
    }
    const groups = [...projects.group].sort((x) => (x.slug === 'portfolio' ? -1 : 0))
    return (
      <>
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
                <div className='mt-12 text-lg'>
                  <span>
                    [{nodes.length} out of {totalCount}]{' '}
                  </span>
                  <ProjectCategory item={category}>
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
      </>
    )
  }
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
