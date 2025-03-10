import accountApi from '@/apis/account'
import { cookies } from 'next/headers'
import React from 'react'

export default async function Dashboard() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value!
  let name = ''
  try {
    const result = await accountApi.sGetPersonalAccount(accessToken)
    console.log(result)
    name = result.payload.data.name
    console.log('name', name)
  } catch (error: any) {
    console.log(error)
    if(error?.digest?.includes('NEXT_REDIRECT'))
      throw error
  }
  return <div>Hi guy {name}</div>
}
