'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link' 
import { useLogoutMutation } from '@/queries/useAuth'
import { handleErrorApi } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const account = {
  name: 'Nguyen Van A',
  avatar: 'https://i.pravatar.cc/150'
}

export default function DropdownAvatar() { 
  const logoutMutation = useLogoutMutation()
  const router = useRouter()

  const logout = async () => {
    if (logoutMutation.isPending) return
    try {
      await logoutMutation.mutateAsync()
      toast.success("Logout successfully")
      router.push('/')
    } catch (error: any) {
      handleErrorApi({
        error
      })
    }
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='overflow-hidden rounded-full'
        >
          <Avatar>
            <AvatarImage
              src={account?.avatar ?? undefined}
              alt={account?.name}
            />
            <AvatarFallback>
              {account?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>{account?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={'/manage/setting'} className='cursor-pointer'>
            Cài đặt
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Hỗ trợ</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Đăng xuất</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
