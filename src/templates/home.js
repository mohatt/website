import React from 'react'
import { graphql } from 'gatsby'
import { Page, Hero, Typewriter } from '../components'

export default class Home extends Page {
  view() {
    this.title = this.props.data.page.title
    this.pretext = 'Hi, I’m Mohamed,'
    const words = ['high quality', 'user-friendly', 'efficient', 'modern', 'beautiful']
    const hero = (
      <>
        I move pixels and lines of
        <br />
        code to craft <Typewriter words={words} loop speed={50} backspace={30} delay={4000} className='text-primary' />
        <br />
        digital experiences
      </>
    )
    const actions = [
      { title: 'Skills', to: 'skills', alt: true },
      { title: 'Get In Touch', to: 'home' },
    ]
    return (
      <Hero title={hero} actions={actions}>
        I'm a full-stack web developer with a broad range of skills and expertise in most web
        development related fields.
      </Hero>
    )
  }
}

export const query = graphql`
  query Home($id: String!) {
    page(id: { eq: $id }) {
      title
    }
  }
`
