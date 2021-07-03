import React from 'react'
import { Link as InternalLink } from 'gatsby-plugin-advanced-pages'
import { useAnalytics } from '../providers/analytics'

function OutboundLink({ linkId, ...props }) {
  const { event } = useAnalytics()

  return (
    <a
      {...props}
      onClick={e => {
        if (props.onClick) {
          props.onClick(e)
        }
        let redirect = true
        if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || e.defaultPrevented) {
          redirect = false
        }
        if (props.target && props.target.toLowerCase() !== '_self') {
          redirect = false
        }
        event('click', {
          link_url: props.href,
          link_domain: new URL(props.href)?.hostname,
          link_id: linkId || props.id,
          outbound: true,
          event_callback: function () {
            if (redirect) {
              document.location = props.href
            }
          },
        })
        return false
      }}
    />
  )
}

export default function Link({ to, external, ...props }) {
  if (external) {
    if (typeof external === 'string') {
      props.linkId = external
    }
    return <OutboundLink href={to} {...props} />
  }

  return <InternalLink to={to} {...props} />
}
