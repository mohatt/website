import React from 'react'
import { graphql } from 'gatsby'

function Testimonial({ test, children, className }) {
  const image = test.image.childImageSharp.resize.src
  if (children instanceof Function) {
    return children(Object.assign({}, test, { image }))
  }

  return (
    <blockquote className={className}>
      <div className='text-xl italic font-medium'>“{test.quote}”</div>
      <div className='mt-4 flex flex-row items-center opacity-90'>
        <img className='w-14 border-2 border-primary rounded-full shadow-lg' src={image} alt={test.name} />
        <div className='ml-2 leading-normal'>
          {test.name}<br />{test.title}
        </div>
      </div>
    </blockquote>
  )
}

Testimonial.Map = function TestimonialMap({ data, children, ...props }) {
  return data.map(test => <Testimonial key={test.name} test={test} children={children} {...props} />)
}

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
