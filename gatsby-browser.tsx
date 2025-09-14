import type { GatsbyBrowser } from 'gatsby'
import Providers from './src/providers'
import LayoutProvider from './src/providers/layout/LayoutProvider'
import './src/css/index.css'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
  return <Providers>{element}</Providers>
}

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
  return <LayoutProvider layout='default'>{element}</LayoutProvider>
}
