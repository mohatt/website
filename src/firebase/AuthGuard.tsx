import type { ReactNode } from 'react'
import { useAuthState, useSignInWithGoogle, useSignOut } from 'react-firebase-hooks/auth'
import { site } from '@/constants'
import { Button, Heading, Icon, Section } from '@/components'
import { useFirebaseAuth } from './useFirebaseAuth'

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

    const { displayName, email, photoURL } = authState
    const accessError = site.deployment.admins.includes(email)
      ? null
      : `Access denied for ${email}.`

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
                  src={photoURL}
                  alt={`Portrait of ${displayName}`}
                />
                <div className='flex-grow'>
                  <div>{displayName}</div>
                  <a className='link text-primary' onClick={handleSignOut}>
                    Logout
                  </a>
                </div>
              </div>
            }
          >
            {accessError}
          </Heading>
          {signOutError && (
            <div className='mb-6'>
              <h4 className='text-primary'>Logout Failed</h4>
              {signOutError.message}
            </div>
          )}
          {!accessError && children}
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
