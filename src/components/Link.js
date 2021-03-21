import React from 'react'
import { Link as InternalLink } from 'gatsby-plugin-advanced-pages'

export default ({ to, external = false, ...props }) => {
  if (external) {
    return <a href={to} {...props} />
  }

  return <InternalLink to={to} {...props} />
}
