import dishApi from '@/apis/dish'
import { formatCurrency } from '@/lib/utils'
import { DishListResType } from '@/schemas/dish.schema'
import Image from 'next/image'

export default async function Home() {
  let dishData: DishListResType['data'] = []
  try {
    const result = await dishApi.getAllDishes()
    const {payload: {data}} = result
    dishData = data
  } catch (error) {
    return <div>Something is fail</div>
  } 

  return (
    <div className='w-full space-y-4'>
      <div className='relative'>
        <span className='absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10'></span>
        <Image
          src='/banner.png'
          width={400}
          height={200}
          alt='Banner'
          className='absolute top-0 left-0 w-full h-full object-cover'
        />
        <div className='z-20 relative py-10 md:py-20 px-4 sm:px-10 md:px-20'>
          <h1 className='text-center text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold'>Nhà hàng Delicious Food</h1>
          <p className='text-center text-sm sm:text-base mt-4'>Vị ngon, trọn khoảnh khắc</p>
        </div>
      </div>
      <section className='space-y-10 py-16'>
        <h2 className='text-center text-2xl font-bold'>Đa dạng các món ăn</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {dishData?.map((dish, index) => (
              <div className='flex gap-4 w' key={index}>
                <div className='flex-shrink-0'>
                  <Image
                    src={dish?.image}
                    className='object-cover w-[150px] h-[150px] rounded-md'
                    width={150}
                    height={150}
                    quality={100}
                    alt={dish?.name}
                  />
                </div>
                <div className='space-y-1'>
                  <h3 className='text-xl font-semibold'>{dish?.name}</h3>
                  <p className=''>{dish?.description}</p>
                  <p className='font-semibold'>{formatCurrency(dish?.price)}đ</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}
