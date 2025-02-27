import ChangePasswordForm from '@/app/manage/setting/change-password-form'
import UpdateProfileForm from '@/app/manage/setting/update-profile-form'
import { Badge } from '@/components/ui/badge'

export default function Setting() {
  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <div className='mx-auto grid w-full flex-1 auto-rows-max gap-4'>
        <div className='flex items-center gap-4'>
          <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>Cài đặt</h1>
          <Badge variant='outline' className='ml-auto sm:ml-0'>
            Owner
          </Badge>
        </div>
        <div className='grid gap-4 md:grid-cols-2 md:gap-8'>
          <UpdateProfileForm />
          <ChangePasswordForm />
        </div>
      </div>
    </main>
  )
}
