import React from 'react'
import { graphql } from 'gatsby'
import { Page, Hero, Typewriter } from '../components'

export default class Index extends Page {
  view() {
    this.title = this.props.data.page.title
    this.description = `I'm a full\u2011stack software engineer with years of hands\u2011on experience across front\u2011end, back\u2011end, and cloud infrastructure.`
    this.snippet = 'Hi, I’m Mohamed.'
    const words = ['scalable', 'reliable', 'optimized', 'maintainable', 'user-friendly', 'accessible']
    const hero = (
      <span className='word-tracking-tight tracking-tight sm:word-tracking-normal sm:tracking-normal'>
        I move pixels and lines of code to
        craft <Typewriter words={words} loop speed={50} backspace={30} delay={4000} className='text-primary' />
        <br />
        web applications.
      </span>
    )
    const actions = [
      { title: 'Skills', to: 'skills', alt: true },
      { title: 'Projects', to: 'projects' },
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
