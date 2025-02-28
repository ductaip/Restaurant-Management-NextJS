'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
  UpdateMeBody,
  UpdateMeBodyType
} from '@/schemas/account.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar' 
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAccountProfile, useUpdatePersonalProfileMutation } from '@/queries/useAccount'
import { useUploadMediaMutation } from '@/queries/useMedia'
import { toast } from 'sonner'
import { handleErrorApi } from '@/lib/utils'

export default function UpdateProfileForm() { 
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const {data, refetch} = useAccountProfile()
  const updateProfileMutation = useUpdatePersonalProfileMutation()
  const uploadAvtMutation = useUploadMediaMutation()

  //useform
  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: '',
      avatar: undefined
    }
  })    

  const avatar = form.watch('avatar')
  const name = form.watch('name')

  useEffect(() => {
      if(data) {
        const { name, avatar } = data?.payload.data
        form.reset({
          name,
          avatar: avatar ?? undefined
        })
      }
  }, [form, data])

  const previewAvatar = useMemo(() => {
    return file ? URL.createObjectURL(file) : avatar
  }, [file, avatar])

  const reset = () => {
    form.reset()
    setFile(null)
  }

  const onSubmit = async (values: UpdateMeBodyType) => {
    if(updateProfileMutation.isPending) return
    try {
      let body = values
      if(file) {
        const formData = new FormData()
        formData.append('file', file as Blob)
        const uploadAvtResult = await uploadAvtMutation.mutateAsync(formData)
        const imageUrl = uploadAvtResult.payload.data
        body = {
          ...values,
          avatar: imageUrl
        }
      }
      const result = await updateProfileMutation.mutateAsync(body)
      toast.success("Update personal profile successfully")
      refetch()
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }
 
  return (
    <Form {...form}>
      <form
        noValidate
        className='grid auto-rows-max items-start gap-4 md:gap-8'
        onReset={reset}
        onSubmit={form.handleSubmit(onSubmit, (e) => {
          console.log(e)
        })}
      >
        <Card x-chunk='dashboard-07-chunk-0'>
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid gap-6'>
              <FormField
                control={form.control}
                name='avatar'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex gap-2 items-start justify-start'>
                      <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
                        <AvatarImage src={previewAvatar} />
                        <AvatarFallback className='rounded-none'>
                          {name}
                        </AvatarFallback>
                      </Avatar> 
                      <input type="file" ref={fileRef} className='hidden' 
                        onChange={(e) => {
                          const fileFromLocal = e.target.files?.[0]
                          if(fileFromLocal) {
                            setFile(fileFromLocal)
                            field.onChange('http://localhost:3000/' + field.name)
                          }
                        }} 
                      />
                      <button
                        className='flex aspect-square w-[100px] items-center justify-center rounded-md border border-dashed'
                        type='button'
                        onClick={() => fileRef.current?.click()}
                      >
                        <Upload className='h-4 w-4 text-muted-foreground' />
                        <span className='sr-only'>Upload</span>
                      </button>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid gap-3'>
                      <Label htmlFor='name'>Tên</Label>
                      <Input
                        id='name'
                        type='text'
                        className='w-full'
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className=' items-center gap-2 md:ml-auto flex'>
                <Button variant='outline' size='sm' type='reset'>
                  Hủy
                </Button>
                <Button size='sm' type='submit'>
                  Lưu thông tin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
