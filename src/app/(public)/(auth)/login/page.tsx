import LoginForm from '@/app/(public)/(auth)/login/login-form'
import { Suspense } from 'react'

export default function Login() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}
