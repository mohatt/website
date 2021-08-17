import React, { useEffect, useState } from 'react'
import { cx } from '../util'
import { useMounted } from '../hooks'

function TypewriterText({ words, loop, typeSpeed, deleteSpeed, delay }) {
  const [speed, setSpeed] = useState(typeSpeed)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [counter, setCounter] = useState(0)

  const typewriter = () => {
    const index = loop ? counter % words.length : counter
    const word = words[index]

    if (deleting) {
      setSpeed(deleteSpeed)
      setText(word.substring(0, text.length - 1))
    } else {
      setSpeed(typeSpeed)
      setText(word.substring(0, text.length + 1))
    }

    if (!deleting && text === word) {
      if (!loop && counter >= words.length - 1) {
        return
      }

      setDeleting(true)
      setSpeed(delay)
    } else if (deleting && text === '') {
      setDeleting(false)
      setCounter(counter + 1)
    }
  }

  useEffect(() => {
    const timer = setTimeout(typewriter, speed)
    return () => clearTimeout(timer)
  }, [typewriter, speed])

  return text
}

function Typewriter({
  words = [],
  loop = false,
  speed = 100,
  delay = 1500,
  backspace = speed,
  cursor = '|',
  className,
}) {
  const mounted = useMounted()
  return (
    <span className={cx('typewriter', className)}>
      {mounted
        ? <TypewriterText
            words={words}
            loop={loop}
            typeSpeed={speed}
            deleteSpeed={backspace}
            delay={delay}
          />
        : words[0]
      }
      {cursor && mounted && (
        <span className='typewriter-cursor'>
          {cursor}
        </span>
      )}
    </span>
  )
}

export default React.memo(Typewriter)
