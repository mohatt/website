import React from 'react'
import Link from '../Link'
import * as styles from './Author.module.css'

export default ({ author, route }) => {
  const Heading = route.path === '/' ? 'h1' : 'h2'
  return (
    <div>
      <a className={`${styles.avatar} block absolute rounded-full mt-10 right-0 -mr-16 h-32 w-32 bg-cover bg-center border-4 border-primary transition-all`}>
        <span className='absolute w-5 h-5 bg-green-500 rounded-full bottom-0 left-0 ml-4' />
      </a>
      <Heading className={`${styles.author} block absolute font-display font-medium italic text-primary text-md mt-48 mr-1 right-0`}>
        <Link title={author.name} to='home'>{author.screenName}</Link>
      </Heading>
    </div>
  )
}