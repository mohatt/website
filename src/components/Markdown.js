import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { Heading, Section, Button, ButtonGroup, Link, Icon } from '.'

function Markdown({ components = {}, children, ...props }) {
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

export default React.memo(Markdown)
