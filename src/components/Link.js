import React from 'react'
import { Link as InternalLink } from 'gatsby-plugin-advanced-pages'

const Link = ({ to, external = false, ...props }) => {
  if (external) {
    return <a href={to} {...props} />
  }

  return <InternalLink to={to} {...props} />
}

export default Link
