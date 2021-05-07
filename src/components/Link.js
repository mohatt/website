import React from 'react'
import { Link as InternalLink } from 'gatsby-plugin-advanced-pages'
import { useAnalytics } from "../hooks";

function OutboundLink({ ...props }) {
  const { log } = useAnalytics()

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
        if (log) {
          log('click', {
            event_category: 'outbound',
            event_label: props.href,
            transport_type: redirect ? 'beacon' : '',
            event_callback: function () {
              if (redirect) {
                document.location = props.href
              }
            },
          })
        } else {
          if (redirect) {
            document.location = props.href
          }
        }

        return false
      }}
    />
  )
}

export default function Link({ to, external, ...props }) {
  if (external) {
    return <OutboundLink href={to} {...props} />
  }

  return <InternalLink to={to} {...props} />
}
