import React from 'react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'

const Mdx = ({ children }) => (
  <>
    <MDXRenderer>{children}</MDXRenderer>
  </>
)

export default Mdx
