import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import * as sharedComponents from '../'

const exclude = ['Layout']
const shortcodes = Object.fromEntries(
  Object.entries(sharedComponents).filter(([name, component]) => exclude.indexOf(name) === -1)
)

export default ({ components = {}, children, ...props }) => (
  <>
    <MDXProvider components={Object.assign({}, shortcodes, components)}>
      <MDXRenderer {...props}>{children}</MDXRenderer>
    </MDXProvider>
  </>
)
