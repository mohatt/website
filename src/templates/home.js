import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { Layout, Hero } from '../components'
import Typed from 'typed.js'

const HomeTemplate = ({ data: { page } }) => {
  const {
    title,
    pretitle,
    subtitle,
    actions
  } = page.data

  const typedPlaceholder = React.createRef()

  useEffect(() => {
    const options = {
      strings: title.strings,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 5000,
      loop: true
    }
    const typed = new Typed(typedPlaceholder.current, options)

    return function cleanup () {
      typed.destroy()
    }
  })

  const titleParts = title.text.split('%%')
  const titleNode = <>{titleParts[0]}<span ref={typedPlaceholder} className='text-primary' /><br />{titleParts[1] || ''}</>

  return (
    <Layout title={page.title}>
      <Hero
        title={titleNode}
        pretitle={pretitle}
        children={subtitle}
        actions={actions}
      />
    </Layout>
  )
}

export const query = graphql`
  query Home($id: String!) {
    page(id: { eq: $id }) {
      title
      data
    }
  }
`

export default HomeTemplate
