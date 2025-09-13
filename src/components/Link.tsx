import { ComponentProps, SyntheticEvent } from 'react'
import { Link as InternalLink, LinkProps as InternalLinkProps } from 'gatsby-plugin-advanced-pages'
import { $window } from '../constants'
import { useAnalytics } from '../hooks'

function parseLink(href: string) {
  try {
    const url = new URL(href, $window.location.href)
    const type = url.protocol ? url.protocol.slice(0, -1) : 'unknown' // e.g., 'https', 'mailto'
    const isHttp = type === 'http' || type === 'https'
    const isOutbound = isHttp && url.hostname !== $window.location.hostname

    // Domain for reporting: hostname for http(s); otherwise fall back to scheme label
    const domain = isHttp ? url.hostname : url.hostname || type

    // Skip noisy/unsafe schemes
    const trackable = type !== 'javascript' && type !== 'data'

    return { type, isHttp, isOutbound, domain, trackable }
  } catch {
    return { type: 'invalid' }
  }
}

interface OutboundLinkProps extends ComponentProps<'a'> {
  linkId?: string
}

function OutboundLink({ linkId, rel, onClick, onAuxClick, ...props }: OutboundLinkProps) {
  const { event } = useAnalytics()

  // rel safety for new tabs
  const needsNoRef = props.target === '_blank'
  const safeRel = [
    ...(rel ? rel.split(/\s+/).filter(Boolean) : []),
    ...(needsNoRef ? ['noreferrer'] : []),
    'nofollow',
  ]
    .filter((v, i, a) => a.indexOf(v) === i)
    .join(' ')

  const track = (e: SyntheticEvent) => {
    // If href is empty, behave like a native <a> without href (don't track)
    if (!props.href) return
    if (e.defaultPrevented) return

    const meta = parseLink(props.href)
    if (!meta.trackable) return
    const payload: any = {
      link_url: props.href,
      link_domain: meta.domain,
      link_id: linkId || props.id,
      transport_type: 'beacon', // GA will prefer `sendBeacon` for unload-safe delivery
    }
    if (meta.isOutbound) payload.outbound = true
    if (!meta.isHttp && meta.type) payload.link_type = meta.type

    event('click', payload)
  }

  return (
    <a
      {...props}
      rel={safeRel || undefined}
      onClick={(e) => {
        if (onClick) onClick(e)
        // GA-style: track left-click; let the browser navigate natively
        track(e)
      }}
      onAuxClick={(e) => {
        if (onAuxClick) onAuxClick(e)
        // Track middle-click (button === 1); ignore right-click (button === 2)
        if (e.button === 1) track(e)
      }}
    />
  )
}

export type LinkProps = InternalLinkProps<any> | OutboundLinkProps

export default function Link(props: LinkProps) {
  if ('to' in props) {
    return <InternalLink {...props} />
  }
  return <OutboundLink {...props} />
}
