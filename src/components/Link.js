import React from 'react'
import { Link as InternalLink } from 'gatsby-plugin-advanced-pages'
import { OutboundLink } from "gatsby-plugin-google-gtag"

export default function Link({ to, external, ...props }) {
  if (external) {
    return <OutboundLink href={to} {...props} />
  }

  return <InternalLink to={to} {...props} />
}
