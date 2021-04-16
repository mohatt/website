import React from 'react'
import { Section, Button, ButtonGroup } from '.'

export default function Hero({ children, title, actions, className }) {
  return (
    <Section className={className}>
      <header className='mt-8 mb-12 max-w-lg'>
        <h2 className='italic text-3xl leading-relaxed text-typo'>
          {title}
        </h2>
        <div className='mt-8 text-2xl leading-normal text-typo-dim'>{children}</div>
      </header>
      <footer>
        <ButtonGroup spacing>
          {actions &&
            actions.map(action => (
              <Button color='primary' to={action.to} outline={action.alt} key={action.to}>
                {action.title}
              </Button>
            ))}
        </ButtonGroup>
      </footer>
    </Section>
  )
}
