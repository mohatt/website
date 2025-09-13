import type { ReactNode } from 'react'
import { useAuthState, useSignInWithGoogle, useSignOut } from 'react-firebase-hooks/auth'
import { site } from '../constants'
import { useFirebaseAuth } from './useFirebaseAuth'
import { Button, Heading, Icon, Section } from '../components'

export interface AuthGuardProps {
  title: string
  children: ReactNode
}

export function AuthGuard({ title, children }: AuthGuardProps) {
  const auth = useFirebaseAuth()
  const [authState, authStateLoading, authStateError] = useAuthState(auth)
  const [signIn, _, signInLoading, signInError] = useSignInWithGoogle(auth)
  const [signOut, signOutLoading, signOutError] = useSignOut(auth)

  if (authState) {
    const handleSignOut = (e) => {
      if (!signOutLoading) {
        void signOut()
      }
      e.preventDefault()
    }

    let accessDenied = null
    if (!site.deployment.admins.includes(authState.email)) {
      accessDenied = `Access denied for ${authState.email}.`
    }

    return (
      <>
        <Section>
          <Heading
            title={title}
            end={
              <div className='flex'>
                <img
                  height='auto'
                  className='w-12 mr-2 border-2 border-primary rounded-[999px] shadow-lg'
                  src={authState.photoURL}
                  alt={`Portrait of ${authState.displayName}`}
                />
                <div className='flex-grow'>
                  <div>{authState.displayName}</div>
                  <a className='link text-primary' onClick={handleSignOut}>
                    Logout
                  </a>
                </div>
              </div>
            }
          >
            {accessDenied}
          </Heading>
          {signOutError && (
            <div className='mb-6'>
              <h4 className='text-primary'>Logout Failed</h4>
              {signOutError.message}
            </div>
          )}
          {!accessDenied && children}
        </Section>
      </>
    )
  }

  const handleSignIn = () => {
    void signIn([], {
      // Force account selection even when one account is available.
      prompt: 'select_account',
    })
  }

  return (
    <Section>
      {authStateLoading ? (
        <Heading title={title}>Please wait...</Heading>
      ) : (
        <Heading title='Login'>You must be logged in to view this page.</Heading>
      )}
      {authStateError && (
        <div className='mb-6'>
          <h4 className='text-primary'>Login State Failure</h4>
          {authStateError.message}
        </div>
      )}
      {signInError && (
        <div className='mb-6'>
          <h4 className='text-primary'>Login Failed</h4>
          {signInError.message}
        </div>
      )}
      {!authStateLoading && (
        <Button onClick={handleSignIn} color='primary' disabled={signInLoading}>
          <Icon name='google' className='w-5 mr-2' />
          {signInLoading ? 'Please wait...' : 'Login with Google'}
        </Button>
      )}
    </Section>
  )
}
