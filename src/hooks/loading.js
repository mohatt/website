import React, {useState, useEffect, useCallback} from 'react'

const LoadingContext = React.createContext()

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState('done')

  useEffect(() => {
    window.___emitter.on('___loading', state => {
      setLoading(state)
    })
  }, [])

  const setStoredValue = useCallback(state => {
    setLoading(typeof state === 'string' ? state : (state ? 'started' : 'done'))
  }, [setLoading])

  const state = {
    started: loading === 'started',
    done: loading === 'done',
    delayed: loading === 'delayed',
    setLoading: setStoredValue
  }

  return (
    <LoadingContext.Provider value={state}>
      {children}
    </LoadingContext.Provider>
  )
}

export default function useLoading() {
  return React.useContext(LoadingContext)
}
