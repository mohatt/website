import { useState, useEffect } from "react";

/**
 * Workaround for Gatsby’s rehydration issue
 * @see https://github.com/gatsbyjs/gatsby/issues/14601#issuecomment-499922794
 * @see https://blog.logrocket.com/fixing-gatsbys-rehydration-issue/
 * @example
 * const Component = () => {
 *  const { isClient, key } = useIsClient()
 * 
 *  const [token, setToken] = useLocalStorage('token', '')
 *  const isLoggedIn = token !== ''
 * 
 *  const onLogin = () => setToken(Math.random().toString(36).substring(2))
 *  const onLogout = () => setToken('')
 *
 *  // Optional
 *  // this prevents the style flickering issue by making the
 *  // component client-only
 *  if ( !isClient ) return null
 *  return (
 *    <div key={key}>
 *      {isLoggedIn
 *        ? <button className={css['red']} onClick={onLogout}>Logout</button>
 *        : <button className={css['blue']} onClick={onLogin}>Login</button>}
 *    </div>
 *  )
 * }
 */
export default function useIsClient()  {
  const [isClient, setClient] = useState(false)
  const key = isClient ? 'client' : 'server'

  useEffect(() => {
    setClient(true)
  }, [])

  return { isClient, key }
}
