import type { ReactNode } from 'react'
import { Button, ButtonGroup, Section } from '.'

export interface HeroProps {
  title: ReactNode
  children: ReactNode
  actions?: Array<{
    to: string
    title: string
    alt?: boolean
  }>
  className?: string
}

export default function Hero({ children, title, actions, className }: HeroProps) {
  return (
    <Section className={className}>
      <header className='mb-10 max-w-lg'>
        <h2 className='italic text-3xl leading-relaxed text-typo'>{title}</h2>
        <div className='mt-8 text-2xl leading-normal text-typo-dim'>{children}</div>
      </header>
      <footer>
        {actions && (
          <ButtonGroup spacing>
            {actions.map((action) => (
              <Button color='primary' to={action.to} outline={action.alt} key={action.to}>
                {action.title}
              </Button>
            ))}
          </ButtonGroup>
        )}
      </footer>
    </Section>
  )
}
