import { memo, useEffect, useRef, useState } from 'react'
import { cx } from '@/util'
import { useMounted } from '@/hooks'

export interface TypewriterTextProps {
  // Words to type, in order
  words: string[]
  // Loop back to the first word after the last
  loop?: boolean
  // Milliseconds between typed characters
  typeSpeed?: number
  // Milliseconds between deleted characters
  deleteSpeed?: number
  // Pause at full word before deleting (ms)
  delay?: number
}

/**
 * Progressive type/delete text effect.
 */
function TypewriterText(props: TypewriterTextProps): string {
  const { words, loop, typeSpeed, deleteSpeed, delay } = props
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

    if (!words.length) return undefined

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

export interface TypewriterProps {
  // Words to type, in order
  words?: string[]
  // Loop back to the first word after the last. Default: `false`
  loop?: boolean
  // Typing speed (ms). Default: `100`
  speed?: number
  // Pause at full word (ms). Default: `1500`
  delay?: number
  // Deleting speed (ms). Defaults to `speed`.
  backspace?: number
  // Cursor glyph. Pass falsy to hide. Default: `|`
  cursor?: string | false
  className?: string
}

/**
 * Typewriter component.
 */
function Typewriter(props: TypewriterProps) {
  const {
    words = [],
    loop = false,
    speed = 100,
    delay = 1500,
    backspace = speed,
    cursor = '|',
    className,
  } = props
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

export default memo(Typewriter)
