import { useMemo } from 'react'
import { getApps, getApp, initializeApp } from 'firebase/app'
import { site } from '../constants'

export const useFirebase = () => {
  return useMemo(() => {
    const apps = getApps()
    if (!apps?.length) {
      // Initialize Firebase
      return initializeApp(site.deployment.firebase)
    }
    return getApp()
  }, [])
}
