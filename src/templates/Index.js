import React from 'react'
import { graphql } from 'gatsby'
import { Page, Hero, Typewriter } from '../components'

export default class Index extends Page {
  view() {
    this.title = this.props.data.page.title
    this.description = `I'm a full-stack web developer with a broad range of skills and expertise in most web development related fields.`
    this.snippet = 'Hi, I’m Mohamed,'
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
        {this.description}
      </Hero>
    )
  }
}

export const query = graphql`
  query Index($id: String!) {
    page(id: { eq: $id }) {
      title
    }
  }
`
