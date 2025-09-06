import React from 'react'
import { graphql } from 'gatsby'
import { createReactMap, cx } from '../../util'

function Testimonial({ test, children, showImage, className }) {
  if (children) {
    return children(test)
  }

  const { name, title, quote, image } = test
  return (
    <blockquote className={className}>
      <div className='text-xl italic'>“{quote}”</div>
      <div
        className={cx(
          'mt-4 flex flex-row font-bold text-primary',
          showImage ? 'items-center' : 'items-start',
        )}
      >
        {showImage ? (
          <img
            width='120'
            height='120'
            className='w-14 mr-2 border-2 border-primary rounded-[999px] shadow-lg'
            src={image.childImageSharp.resize.src}
            alt={`Portrait of ${name}`}
          />
        ) : (
          <span className='mr-1'>—</span>
        )}
        <div className='leading-normal'>
          {name}
          <br />
          <span className='font-normal'>{title}</span>
        </div>
      </div>
    </blockquote>
  )
}

Testimonial.Map = createReactMap(function TestimonialMap(test, { showImage, className, children }) {
  return (
    <Testimonial
      key={test.name}
      test={test}
      showImage={showImage}
      className={className}
      children={children}
    />
  )
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
