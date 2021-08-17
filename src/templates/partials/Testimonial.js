import React from 'react'
import { graphql } from 'gatsby'
import { createReactMap } from '../../util'

function Testimonial({ test: { name, title, quote, image }, className }) {
  return (
    <blockquote className={className}>
      <div className='text-xl italic'>“{quote}”</div>
      <div className='mt-4 flex flex-row items-center opacity-90'>
        <img
          width='120'
          height='120'
          className='w-14 border-2 border-primary rounded-full shadow-lg'
          src={image.childImageSharp.resize.src} alt={name}
        />
        <div className='ml-2 leading-normal'>{name}<br />{title}</div>
      </div>
    </blockquote>
  )
}

Testimonial.Map = createReactMap(function TestimonialMap(test, { className }) {
  return <Testimonial key={test.name} test={test} className={className} />
})

export const TestimonialFragment = graphql`
  fragment TestimonialFragment on Testimonial {
    name
    title
    quote
    image {
      childImageSharp {
        resize(width: 120, height: 120) {
          src
        }
      }
    }
  }
`

export default Testimonial
