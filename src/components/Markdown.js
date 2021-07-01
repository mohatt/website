import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { BaseIcon, Button, Heading, Icon, Link, Separator, Typography } from '.'

const shortcodes = {
  a({ href, ...props }) {
    return <Link to={href} external='mdx_link' {...props} />
  },
  BaseIcon,
  Button,
  Heading,
  Icon,
  Link,
  Separator,
}

export default function Markdown({ children, ...props }) {
  return (
    <MDXProvider components={shortcodes}>
      <Typography>
        <MDXRenderer {...props}>{children}</MDXRenderer>
      </Typography>
    </MDXProvider>
  )
}
