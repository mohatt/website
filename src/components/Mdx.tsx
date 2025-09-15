import type { ReactNode } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { BaseIcon, Button, Heading, Icon, Link, Separator, Typography } from './index'

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

export interface MdxProps {
  children: ReactNode
}

export default function Mdx({ children }: MdxProps) {
  return (
    <MDXProvider components={shortcodes}>
      <Typography>{children}</Typography>
    </MDXProvider>
  )
}
