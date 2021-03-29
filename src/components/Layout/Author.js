import React from 'react'
import { useCurrentRoute } from '../../hooks'
import { Link } from '..'
import * as styles from './Author.module.css'

export default function Author({ author }) {
  const { path } = useCurrentRoute()
  const Heading = path === '/' ? 'h1' : 'h2'
  return (
    <div>
      <a className={`block absolute rounded-full mt-10 right-0 -mr-16 h-32 w-32 bg-cover bg-center border-4 border-primary transition-all ${styles.avatar} `}>
        <span className='absolute w-5 h-5 bg-green-500 rounded-full bottom-0 left-0 ml-4' />
      </a>
      <Heading className={`block absolute italic mt-48 mr-1 right-0 ${styles.author}`}>
        <Link title={author.name} to='home'>{author.screenName}</Link>
      </Heading>
    </div>
  )
}
