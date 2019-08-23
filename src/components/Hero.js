import React from 'react'
import { Heading, Section, Button, ButtonGroup } from './'

const Hero = ({ children, title, pretitle, actions }) => {
  return (
    <Section>
      <Heading level='2' size='4xl' pretitle={pretitle} subtitle={children}>{title}</Heading>
      <footer className='mt-8'>
        <ButtonGroup spacing className='rfs-lg'>
          {actions !== undefined && actions.map((action) => (
            <Button to={action.to} outline={action.alt} key={action.to}>{action.title}</Button>
          ))}
        </ButtonGroup>
      </footer>
    </Section>
  )
}

export default Hero
