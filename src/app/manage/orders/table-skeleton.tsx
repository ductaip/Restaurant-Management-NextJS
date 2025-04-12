import { Skeleton } from '@/components/ui/skeleton'

export default function TableSkeleton() {
  return (
    <div className='w-full'>
      {/* Tiêu đề của table */}
      <div className='flex justify-between items-center mb-2'>
        <Skeleton className='w-1/4 h-[20px] rounded-md' />
        <Skeleton className='w-1/4 h-[20px] rounded-md' />
        <Skeleton className='w-1/4 h-[20px] rounded-md' />
        <Skeleton className='w-1/4 h-[20px] rounded-md' />
      </div>
      {/* Mô phỏng các hàng trong table */}
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className='flex justify-between items-center mb-2'>
          <Skeleton className='w-1/4 h-[20px] rounded-md' />
          <Skeleton className='w-1/4 h-[20px] rounded-md' />
          <Skeleton className='w-1/4 h-[20px] rounded-md' />
          <Skeleton className='w-1/4 h-[20px] rounded-md' />
        </div>
      ))}
    </div>
  )
}
