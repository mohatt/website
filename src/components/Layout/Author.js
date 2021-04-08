import React from 'react'
import Helmet from 'react-helmet'
import { useCurrentRoute } from '../../hooks'
import { Link } from '..'
import avatar from '../../images/avatar/avatar.png'
import avatarAlt from '../../images/avatar/avatar-smile.png'

export default function Author({ author }) {
  const { path } = useCurrentRoute()
  const Heading = path === '/' ? 'h1' : 'h2'
  return (
    <div id='author'>
      <Helmet>
        <link rel='preload' href={avatar} as='image' />
        <link rel='preload' href={avatarAlt} as='image' />
      </Helmet>
      <a id='avatar' className='block absolute rounded-full mt-10 right-0 -mr-16 h-32 w-32 bg-cover bg-center border-4 border-primary transition-all'>
        <span className='absolute w-5 h-5 bg-green-500 rounded-full bottom-0 left-0 ml-4' />
      </a>
      <Heading className='block absolute italic mt-48 mr-1 right-0'>
        <Link title={author.name} to='home'>{author.screenName}</Link>
      </Heading>
    </div>
  )
}
