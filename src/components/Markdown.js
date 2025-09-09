import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { BaseIcon, Button, Heading, Icon, Link, Separator, Typography } from '.'

const shortcodes = {
  a({ href, ...props }) {
    return <Link href={href} linkId='mdx_link' {...props} />
  },
  BaseIcon,
  Button,
  Heading,
  Icon,
  Link,
  Separator,
}

export default function Markdown({ children }) {
  return (
    <MDXProvider components={shortcodes}>
      <Typography>{children}</Typography>
    </MDXProvider>
  )
}
