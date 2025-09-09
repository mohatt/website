import React, { useEffect, useRef, useState } from 'react'
import { cx } from '../util'
import { useMounted } from '../hooks'

/**
 * Progressive type/delete text effect.
 *
 * @param {Object} props Component props
 * @param {string[]} props.words Words to type, in order.
 * @param {boolean} [props.loop=false] Loop back to the first word after the last.
 * @param {number} [props.typeSpeed=100] Milliseconds between typed characters.
 * @param {number} [props.deleteSpeed=100] Milliseconds between deleted characters.
 * @param {number} [props.delay=1500] Pause at full word before deleting (ms).
 * @returns string
 */
function TypewriterText({ words, loop, typeSpeed, deleteSpeed, delay }) {
  const [text, setText] = useState('')

  // Refs drive the animation without stale closures
  const idxRef = useRef(0) // current word index
  const deletingRef = useRef(false) // are we deleting?
  const textRef = useRef('') // current text snapshot
  const timerRef = useRef(null)

  // Reset when inputs change
  useEffect(() => {
    clearTimeout(timerRef.current)
    idxRef.current = 0
    deletingRef.current = false
    textRef.current = ''
    setText('')

    if (!words.length) return

    const tick = () => {
      const i = idxRef.current % words.length
      const word = words[i] ?? ''
      const isDeleting = deletingRef.current
      const curr = textRef.current

      // Next text
      const next = isDeleting ? word.slice(0, curr.length - 1) : word.slice(0, curr.length + 1)
      textRef.current = next
      setText(next)

      // Next interval
      let ms = isDeleting ? deleteSpeed : typeSpeed

      // At word boundary
      if (!isDeleting && next === word) {
        // Stop on the final word when not looping
        if (!loop && i >= words.length - 1) {
          return
        }
        deletingRef.current = true
        ms = delay
      } else if (isDeleting && next === '') {
        deletingRef.current = false
        idxRef.current += 1
        ms = typeSpeed
      }

      timerRef.current = setTimeout(tick, Math.max(16, ms || 0))
    }

    timerRef.current = setTimeout(tick, Math.max(16, typeSpeed || 0))
    return () => clearTimeout(timerRef.current)
  }, [words, loop, typeSpeed, deleteSpeed, delay])

  return text
}

/**
 * Typewriter component.
 *
 * @param {Object} props Component props
 * @param {string[]} [props.words=[]]
 * @param {boolean} [props.loop=false]
 * @param {number} [props.speed=100] Typing speed (ms).
 * @param {number} [props.delay=1500] Pause at full word (ms).
 * @param {number} [props.backspace] Deleting speed (ms). Defaults to `speed`.
 * @param {string|false} [props.cursor='|'] Cursor glyph. Pass falsy to hide.
 * @param {string} [props.className]
 * @returns {JSX.Element}
 */
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
  const text = mounted ? (
    <TypewriterText
      words={words}
      loop={loop}
      typeSpeed={speed}
      deleteSpeed={backspace}
      delay={delay}
    />
  ) : (
    words[0]
  )

  return (
    <span className={cx('typewriter', className)} aria-live='polite' aria-atomic='true'>
      {text}
      {cursor && mounted && <span className='typewriter-cursor'>{cursor}</span>}
    </span>
  )
}

export default React.memo(Typewriter)
