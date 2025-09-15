import { graphql, PageProps } from 'gatsby'
import { PageHead, PageLayout } from '@/layouts/page'
import { Hero } from '@/components'

export default function Error({ data }: PageProps<Queries.ErrorQuery>) {
  const {
    page: {
      title,
      data: { code = 404, message },
    },
  } = data
  return (
    <PageLayout title={title} snippet={{ $comp: 'Error', code }}>
      <PageHead title={title} noIndex />
      <Hero title={title}>{message as string}</Hero>
    </PageLayout>
  )
}

export const query = graphql`
  query Error($id: String!) {
    page(id: { eq: $id }) {
      title
      data
    }
  }
`
