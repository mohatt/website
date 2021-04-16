import React from 'react'
import { graphql } from 'gatsby'
import { Page, Hero, Typewriter } from '../components'

export default function Home({ data: { page: { title } } }) {
  const words = ['high quality', 'user-friendly', 'efficient', 'modern', 'beautiful']
  const heroTitle = (
    <>
      I move pixels and lines of
      <br />
      code to craft <Typewriter words={words} loop speed={50} backspace={30} delay={4000} className='text-primary' />
      <br />
      digital experiences
    </>
  )
  const heroActions = [
    { title: 'Skills', to: 'skills', alt: true },
    { title: 'Get In Touch', to: 'home' },
  ]
  return (
    <Page title={title} pre='Hi, I’m Mohamed,'>
      <Hero title={heroTitle} actions={heroActions}>
        I'm a full-stack web developer with a broad range of skills and expertise in most web
        development related fields.
      </Hero>
    </Page>
  )
}

export const query = graphql`
  query Home($id: String!) {
    page(id: { eq: $id }) {
      title
    }
  }
`
