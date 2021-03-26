import React from 'react'
import { Link } from 'gatsby-plugin-advanced-pages'
import { OutboundLink } from "gatsby-plugin-google-gtag"

export default ({ to, external, ...props }) => {
  if (external) {
    return <OutboundLink href={to} {...props} />
  }

  return <Link to={to} {...props} />
}
