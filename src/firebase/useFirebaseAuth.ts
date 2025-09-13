import { useMemo } from 'react'
import {
  initializeAuth,
  prodErrorMap,
  browserLocalPersistence,
  browserPopupRedirectResolver,
  inMemoryPersistence,
} from 'firebase/auth'
import { $window } from '../constants'
import { useFirebase } from './useFirebase'

export const useFirebaseAuth = () => {
  const app = useFirebase()
  return useMemo(() => {
    return initializeAuth(app, {
      /**
       * Available options:
       *   {debugErrorMap}: Provides verbose textual context around what went wrong at the cost of bundle size (~10k gzipped)
       *   {prodErrorMap}: Only shows the error code
       */
      errorMap: prodErrorMap,
      persistence: [$window ? browserLocalPersistence : inMemoryPersistence],
      popupRedirectResolver: $window ? browserPopupRedirectResolver : undefined,
    })
  }, [app])
}
