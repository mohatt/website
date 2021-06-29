import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { BaseIcon, Button, Icon, Link, Separator } from '.'

export default function Markdown({ components = {}, children, ...props }) {
  const shortcodes = {
    BaseIcon,
    Button,
    Icon,
    Link,
    Separator,
  }

  return (
    <>
      <MDXProvider components={{ ...shortcodes, ...components}}>
        <MDXRenderer {...props}>{children}</MDXRenderer>
      </MDXProvider>
    </>
  )
}
