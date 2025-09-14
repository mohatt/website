import { graphql, PageProps } from 'gatsby'
import { PageHead, PageLayout } from '../layouts/page'
import { Hero, Typewriter } from '../components'

const content = {
  hi: 'Hi, I’m Mohamed.',
  intro: `I'm a full\u2011stack software engineer with years of hands\u2011on experience across front\u2011end, back\u2011end, and cloud infrastructure.`,
  words: ['scalable', 'reliable', 'optimized', 'maintainable', 'user-friendly', 'accessible'],
}

export default function Index({ data }: PageProps<Queries.IndexQuery>) {
  const title = data.page.title
  const hero = (
    <span className='word-tracking-tight tracking-tight sm:word-tracking-normal sm:tracking-normal'>
      I move pixels and lines of code to craft{' '}
      <Typewriter
        words={content.words}
        loop
        speed={50}
        backspace={30}
        delay={4000}
        className='text-primary'
      />
      <br />
      web applications.
    </span>
  )
  const actions = [
    { title: 'Skills', to: 'skills', alt: true },
    { title: 'Projects', to: 'projects' },
  ]
  return (
    <PageLayout title={title} snippet={content.hi}>
      <PageHead title={title} />
      <Hero title={hero} actions={actions}>
        {content.intro}
      </Hero>
    </PageLayout>
  )
}

export const query = graphql`
  query Index($id: String!) {
    page(id: { eq: $id }) {
      title
    }
  }
`
