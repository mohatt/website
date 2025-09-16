import { graphql } from 'gatsby'
import { createReactMap, ReactMapItemProps, cx } from '@/util'

export interface TestimonialItem extends Queries.TestimonialFragment {}

export interface TestimonialProps extends ReactMapItemProps<TestimonialItem>, TestimonialMapProps {}

function Testimonial({ item, index, children, showImage, className }: TestimonialProps) {
  if (children) {
    return children(item, index)
  }

  const { name, title, quote, image } = item
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
        <div className='leading-relaxed'>
          {name}
          <br />
          <span className='font-normal'>{title}</span>
        </div>
      </div>
    </blockquote>
  )
}

interface TestimonialMapProps {
  showImage?: boolean
  className?: string
}

Testimonial.Map = createReactMap<TestimonialItem, TestimonialMapProps>(
  function TestimonialMap(props) {
    return <Testimonial key={props.item.name} {...props} />
  },
)

export const TestimonialFragment = graphql`
  fragment Testimonial on Testimonial {
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
