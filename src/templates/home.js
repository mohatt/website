import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import Typed from 'typed.js'
import Layout from '../components/Layout'
import Hero from '../components/Hero'

export default function Home({ data: { page } }) {
  const typedPlaceholder = React.createRef()
  useEffect(() => {
    const options = {
      strings: ['high quality', 'user-friendly', 'efficient', 'modern', 'beautiful'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 5000,
      loop: true,
    }
    const typed = new Typed(typedPlaceholder.current, options)
    return function cleanup() {
      typed.destroy()
    }
  })

  const titleNode = (
    <>
      I move pixels and lines of
      <br />
      code to craft <span ref={typedPlaceholder} className='text-primary' />
      <br />
      digital experiences
    </>
  )
  const actions = [
    { title: 'Skills', to: 'skills', alt: true },
    { title: 'Get In Touch', to: 'home' },
  ]
  return (
    <Layout title={page.title}>
      <Hero title={titleNode} pretitle='Hi, I’m Mohamed,' actions={actions}>
        I'm a full-stack web developer with a broad range of skills and expertise in all web
        development related fields.
      </Hero>
    </Layout>
  )
}

export const query = graphql`
  query Home($id: String!) {
    page(id: { eq: $id }) {
      title
    }
  }
`
