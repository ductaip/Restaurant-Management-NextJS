import dishApiRequest from '@/apiRequests/dish'
import { formatCurrency } from '@/lib/utils'
import { DishListResType } from '@/schemaValidations/dish.schema'
import Image from 'next/image'

export default async function Home() {
  let dishList: DishListResType['data'] = []
  try {
    const result = await dishApiRequest.list()
    const {
      payload: { data }
    } = result
    dishList = data
  } catch (error) {
    return <div>Something went wrong</div>
  }
  return (
    <div className='w-full space-y-4'>
      <section className='relative z-10'>
        <span className='absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10'></span>
        <Image
          src='/banner.png'
          width={400}
          height={200}
          quality={100}
          alt='Banner'
          className='absolute top-0 left-0 w-full h-full object-cover'
        />
        <div className='z-20 relative py-10 md:py-20 px-4 sm:px-10 md:px-20'>
          <h1 className='text-center text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold'>
            Nhà hàng Big Boy
          </h1>
          <p className='text-center text-sm sm:text-base mt-4'>
            Vị ngon, trọn khoảnh khắc
          </p>
        </div>
      </section>
      <section className='space-y-10 py-16'>
        <h2 className='text-center text-2xl font-bold'>Đa dạng các món ăn</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {dishList.map((dish) => (
            <div className='flex gap-4 w' key={dish.id}>
              <div className='flex-shrink-0'>
                <Image
                  src={dish.image}
                  width={150}
                  height={150}
                  quality={100}
                  alt={dish.name}
                  className='object-cover w-[150px] h-[150px] rounded-md'
                />
              </div>
              <div className='space-y-1'>
                <h3 className='text-xl font-semibold'>{dish.name}</h3>
                <p className=''>{dish.description}</p>
                <p className='font-semibold'>{formatCurrency(dish.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
