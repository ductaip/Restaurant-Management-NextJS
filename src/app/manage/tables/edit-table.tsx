'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { getTableLink, getVietnameseTableStatus, handleErrorApi } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UpdateTableBody, UpdateTableBodyType } from '@/schemas/table.schema'
import { TableStatus, TableStatusValues } from '@/constants/type'
import { Switch } from '@/components/ui/switch'
import Link from 'next/link'
import { useEffect } from 'react'
import { useGetTableQuery, useUpdateTableMutation } from '@/queries/useTable'
import { toast } from 'sonner'
import QRCodeTable from '@/components/generateQR'

export default function EditTable({
  id,
  setId,
  onSubmitSuccess
}: {
  id?: number | undefined
  setId: (value: number | undefined) => void
  onSubmitSuccess?: () => void
}) {
  const form = useForm<UpdateTableBodyType>({
    resolver: zodResolver(UpdateTableBody),
    defaultValues: {
      capacity: 2,
      status: TableStatus.Hidden,
      changeToken: false
    }
  })
  const updateTableMutation = useUpdateTableMutation()
  const {data} = useGetTableQuery({
    id: id as number,
    enabled: Boolean(id)
  })

  useEffect(() => {
    if(data) {
      const {capacity, status} = data.payload.data
      form.reset({
        capacity,
        status, 
        changeToken: form.getValues('changeToken')
      })
    }
  }, [data, form])

      const onSubmit = async (values: UpdateTableBodyType) => {
        if(updateTableMutation.isPending) return
        try {
          const body: UpdateTableBodyType & {id: number} = {id: id as number, ...values}
           
          const result = await updateTableMutation.mutateAsync(body)
          toast.success("Update table successfully")
          reset()
          onSubmitSuccess && onSubmitSuccess()
        } catch (error) {
          handleErrorApi({
            error,
            setError: form.setError
          })
        }
      }
  
      const reset = () => {
        setId(undefined)
     }

  return (
    <Dialog
      open={Boolean(id)}
      onOpenChange={(value) => {
        if (!value) {
          reset()
        }
      }}
    >
      <DialogContent
        className='sm:max-w-[600px] max-h-screen overflow-auto'
        onCloseAutoFocus={() => {
          form.reset()
          setId(undefined)
        }}
      >
        <DialogHeader>
          <DialogTitle>Cập nhật bàn ăn</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form 
            noValidate 
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid auto-rows-max items-start gap-4 md:gap-8' 
            id='edit-table-form'>
            <div className='grid gap-4 py-4'>
              <FormItem>
                <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                  <Label htmlFor='name'>Số hiệu bàn</Label>
                  <div className='col-span-3 w-full space-y-2'>
                    <Input id='number' type='number' className='w-full' value={data?.payload?.data?.number ?? 0} readOnly />
                    <FormMessage />
                  </div>
                </div>
              </FormItem>
              <FormField
                control={form.control}
                name='capacity'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                      <Label htmlFor='price'>Sức chứa (người)</Label>
                      <div className='col-span-3 w-full space-y-2'>
                        <Input id='capacity' className='w-full' {...field} type='number' />
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                      <Label htmlFor='description'>Trạng thái</Label>
                      <div className='col-span-3 w-full space-y-2'>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Chọn trạng thái' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TableStatusValues.map((status) => (
                              <SelectItem key={status} value={status}>
                                {getVietnameseTableStatus(status)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='changeToken'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                      <Label htmlFor='price'>Đổi QR Code</Label>
                      <div className='col-span-3 w-full space-y-2'>
                        <div className='flex items-center space-x-2'>
                          <Switch id='changeToken' checked={field.value} onCheckedChange={field.onChange} />
                        </div>
                      </div>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormItem>
                <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                  <Label>QR Code</Label>
                  <div className='col-span-3 w-full space-y-2'>
                    {data && 
                      <QRCodeTable  
                        token={data?.payload?.data?.token} 
                        tableNumber={data?.payload?.data?.number}
                      />}
                  </div>
                </div>
              </FormItem>
              <FormItem>
                <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                  <Label>URL gọi món</Label>
                  <div className='col-span-3 w-full space-y-2'>
                    {data && <Link
                      href={getTableLink({
                        token: data?.payload?.data?.token,
                        tableNumber: data?.payload?.data?.number
                      })}
                      target='_blank'
                      className='break-all'
                    >
                      {getTableLink({
                        token: data?.payload?.data?.token,
                        tableNumber: data?.payload?.data?.number
                      })}
                    </Link>}
                  </div>
                </div>
              </FormItem>
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button type='submit' form='edit-table-form'>
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
