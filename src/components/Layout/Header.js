import React from "react";
import { useSiteMetadata } from '../../hooks'
import Author from './Author'
import Contacts from './Contacts'

const Header = React.memo(props => {
  const { author } = useSiteMetadata()
  return (
    <header {...props}>
      <Author author={author} />
      <Contacts contacts={author.contacts} />
    </header>
  )
})

export default Header
