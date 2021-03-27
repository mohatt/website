import React, { useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import Typed from 'typed.js'
import Layout from '../components/Layout'
import Hero from '../components/Hero'

export default function Home({ data: { page } }) {
  const _strings = useRef()
  useEffect(() => {
    const options = {
      strings: ['high quality', 'user-friendly', 'efficient', 'modern', 'beautiful'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 5000,
      loop: true,
    }
    const typed = new Typed(_strings.current, options)
    return function cleanup() {
      typed.destroy()
    }
  })

  const titleNode = (
    <>
      I move pixels and lines of
      <br />
      code to craft <span ref={_strings} className='text-primary' />
      <br />
      digital experiences
    </>
  )
  const actions = [
    { title: 'Skills', to: 'skills', alt: true },
    { title: 'Get In Touch', to: 'home' },
  ]
  return (
    <Layout title={page.title} pretitle='Hi, I’m Mohamed,'>
      <Hero title={titleNode} actions={actions}>
        I'm a full-stack web developer with a broad range of skills and expertise in most web
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
