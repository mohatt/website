import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import Heading from './Heading'
import Section from './Section'
import Button from './Button'
import ButtonGroup from './ButtonGroup'
import Link from './Link'
import Icon from './Icon'

export default ({ components = {}, children, ...props }) => {
  const shortcodes = {
    Heading,
    Section,
    Button,
    ButtonGroup,
    Link,
    Icon
  }
  return (
    <>
      <MDXProvider components={Object.assign({}, shortcodes, components)}>
        <MDXRenderer {...props}>{children}</MDXRenderer>
      </MDXProvider>
    </>
  )
}
